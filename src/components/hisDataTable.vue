<template>
    <div class="overflow-x-auto">
        <table class="table table-zebra table-md">
            <thead>
                <tr class="text-xl">
                    <th>
                        <input type="checkbox" class="checkbox" :checked="isSelectedAll" @change="selectAll" />
                    </th>
                    <th class="text-center">序列号</th>
                    <th class="text-center">方程</th>
                    <th class="text-center">颜色</th>
                    <th class="text-center">维度</th>
                    <th class="text-center">采样点数</th>
                    <th class="text-center">是否可见</th>
                    <th>
                        <icon type="close" class="cursor-pointer text-primary" @click="closeTable" />
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in displayData" :key="index">
                    <th>
                        <input type="checkbox" class="checkbox" :checked="isSelected(item)"
                            @change="toggleSelect(item)" />
                    </th>
                    <td class="text-center text-lg">
                        {{ index + 1 + (currentPagination.currentPage - 1) * currentPagination.pageSize }}
                    </td>
                    <td class="text-lg text-center truncate">
                        {{ item.fn || '未定义' }}
                    </td>
                    <td :style="{ color: item.color || '' }" class="text-lg text-center whitespace-nowrap">
                        {{ item.color }}
                    </td>
                    <td class="text-center text-lg">
                        {{ item.dimension }}
                    </td>
                    <td class="text-center text-lg">
                        {{ item.nSamples }}
                    </td>
                    <td class="text-center">
                        <icon :type="item.visible ? 'check' : 'close'" />
                    </td>
                    <th></th>
                </tr>
            </tbody>
        </table>
        <div class="flex justify-between m-6">
            <div class="join">
                <button class="btn join-item text-xl" @click="renderFn">渲染</button>
                <button class="btn join-item text-xl" @click="clearSelection">取消选择</button>
                <button class="btn join-item text-xl" @click="delectData">删除记录</button>
            </div>
            <div class="join">
                <button class="join-item btn" :disabled="currentPagination.currentPage === 1"
                    @click="changePage(currentPagination.currentPage - 1)">
                    <icon type="doubleLeft" />
                </button>
                <label class="join-item input">
                    <input v-show="!loading" type="text" class="join rounded-none w-12 text-center"
                        :value.number="currentPagination.currentPage" @input="debouncedUpdatePage($event.target.value)">
                    <span v-show="loading" class="loading loading-spinner loading-lg"></span>
                    </input>
                    <span>/</span>
                    <span>{{ currentPagination.totalPages }}</span>
                </label>
                <button class="join-item btn" :disabled="currentPagination.currentPage >= currentPagination.totalPages"
                    @click="changePage(currentPagination.currentPage + 1)">
                    <icon type="doubleRight" />
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import icon from './icon.vue'
import { debounce, clamp } from '../assets/utils/componentUtils'

export default {
    components: {
        icon
    },
    props: {
        localFnData: {
            type: Array,
            default: []
        },
        fnData: {
            type: Array,
            default: []
        },
        pagination: {
            type: Object,
            default: () => ({
                currentPage: 1,
                pageSize: 10,
                totalPages: 1,
                totalRecords: 0
            })
        }
    },
    data() {
        return {
            selection: [],
            totalSelection: {},
            loading: false,
            localPage: 1,
        }
    },
    created() {
        this.debouncedUpdatePage = debounce((page) => {
            page = clamp(page, 1, this.currentPagination.totalPages);
            this.changePage(page);
        }, 250)
    },
    computed: {
        isSelectedAll() {
            return this.displayData.length > 0 ? this.selection.length === this.displayData.length : false;
        },
        localDisplayFnData() {
            const pageSize = 10; // 每页显示10条数据
            const startIndex = (this.currentPagination.currentPage - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            return this.localFnData.slice(startIndex, endIndex);
        },
        displayData() {
            return this.$store.state.auth.isAuthenticated ? this.fnData : this.localDisplayFnData;
        },
        currentPagination() {
            if (this.$store.state.auth.isAuthenticated) {
                return this.pagination;
            } else {
                const pageSize = 10;
                return {
                    currentPage: this.localPage || 1,
                    pageSize: pageSize,
                    totalPages: Math.ceil(this.localFnData.length / pageSize) || 1,
                    totalRecords: this.localFnData.length
                };
            }
        }
    },
    watch: {
        fnData: {
            handler() {
                this.loading = false;
            },
        },
        'pagination.currentPage': {
            handler(newVal) {
                this.selection = this.totalSelection[newVal] || [];
            },
        }
    },
    methods: {
        isSelected(data) {
            return this.selection.some(item => item.id === data.id);
        },
        selectAll() {
            if (this.isSelectedAll) {
                this.selection = [];
            } else {
                this.selection = [...this.displayData];
            }
        },
        clearSelection() {
            this.selection = [];
            this.totalSelection = {};
        },
        toggleSelect(data) {
            if (this.isSelected(data)) {
                this.selection = this.selection.filter(item => item.id !== data.id);
            } else {
                this.selection.push(data);
            }
            console.log(this.selection);
            this._saveCurrentSelection();
        },
        _saveCurrentSelection() {
            this.totalSelection[this.pagination.currentPage] = this.selection;
        },
        changePage(page) {
            if (this.loading) return;
            this.loading = true;
            this._saveCurrentSelection();
            if (this.$store.state.auth.isAuthenticated) {
                // 登录用户：发送事件到父组件获取服务器数据
                this.$emit('changePage', page);
            } else {
                this.localPage = page;
                setTimeout(() => {
                    this.loading = false;
                }, 100);
            }
        },
        closeTable() {
            this.$emit('closeTable');
        },
        getAllSelection() {
            const allSelections = { ...this.totalSelection };
            if (this.selection.length > 0) {
                allSelections[this.pagination.currentPage] = [...this.selection];
            }
            return Object.values(allSelections).flat();
        },
        renderFn() {
            const allData = this.getAllSelection();
            if (allData.length === 0) return;
            const data = {
                data_2D: [],
                data_3D: []
            };
            allData.forEach(item => {
                if (item.dimension === 2) {
                    data.data_2D.push(item);
                } else {
                    data.data_3D.push(item);
                }
            });
            this.$emit('renderFn', data);
        },
        delectData() {
            const allData = this.getAllSelection();
            if (allData.length === 0) return;
            if (this.$store.state.auth.isAuthenticated) {
                const idJSON = JSON.parse(JSON.stringify(allData.map(item => ({ id: item.id }))));
                const callback = () => {
                    this.clearSelection();
                }
                this.$emit('delectData', idJSON, callback);
            } else {
                const deleteIds = new Set(allData.map(item => item.id));
                this.$emit('deleteLocalData', deleteIds);
                this.clearSelection();
            }
        }
    }
}
</script>

<style scoped>
@import url('../assets/componentCss/hisDataTable.css');
</style>