<template>
    <div class="overflow-auto">
        <table class="table table-zebra table-md">
            <thead>
                <tr class="text-xl">
                    <th>
                        <input type="checkbox"
                            class="checkbox border-2 checked:bg-amber-700/90 hover:border-amber-500/80"
                            :checked="isSelectedAll" @change="selectAll" :disabled="!displayData.length" />
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
                        <input type="checkbox"
                            class="checkbox border-2 checked:bg-amber-700/90 hover:border-amber-500/80"
                            :checked="isSelected(item)" @change="toggleSelect(item)" />
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
                    <input v-show="!loading.getData" type="number" class="join rounded-none w-12 text-center"
                        :value="currentPagination.currentPage"
                        @input="debouncedUpdatePage($event.target.value, $event)">
                    <span v-show="loading.getData" class="loading loading-spinner loading-lg"></span>
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
import { getChangeData } from '../services/userService'
import { mapGetters } from 'vuex'

export default {
    components: {
        icon
    },
    props: {
        localFnData: {
            type: Array,
            default: []
        },
    },
    data() {
        return {
            selection: [],
            loading: {
                getData: false
            },
            localPage: 1,
            totalSelection: new Map(),
            localDataMap: new Map(),
            pagination: {
                currentPage: 1,
                pageSize: 4,
                totalPages: 1,
                totalRecords: 0
            },
            fnData: []
        }
    },
    created() {
        this.debouncedUpdatePage = debounce((input, event) => {
            const isValidNumber = /^\d+$/.test(input);
            let page = parseInt(input);
            if (isValidNumber) {
                page = clamp(page, 1, this.currentPagination.totalPages);
                this.changePage(page);
            } else if (input !== '') {
                event.target.value = this.currentPagination.currentPage;
            }
            
        }, 250)
    },
    mounted() {
        if (!this.isAuthenticated) {
            this.initLocalDataMap();
        } else {
            this.getHisData();
        }
    },
    computed: {
        ...mapGetters(['is2D']),
        ...mapGetters('auth', ['isAuthenticated']),
        isSelectedAll() {
            return this.displayData?.length > 0 ? this.selection.length === this.displayData.length : false;
        },
        localDisplayFnData() {
            const pageSize = 4;
            const startIndex = (this.currentPagination.currentPage - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            return this.localFnData.slice(startIndex, endIndex);
        },
        displayData() {
            return this.isAuthenticated ? this.fnData : this.localDisplayFnData;
        },
        currentPagination() {
            if (this.isAuthenticated) {
                return this.pagination;
            } else {
                const pageSize = 4;
                return {
                    currentPage: this.localPage || 1,
                    pageSize: pageSize,
                    totalPages: Math.ceil(this.localFnData.length / pageSize) || 1,
                    totalRecords: this.localFnData?.length || 0
                };
            }
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
            console.log(this.selection);
        },
        clearSelection() {
            this.selection = [];
            this.totalSelection.clear();
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
            if (this.selection.length > 0) {
                this.totalSelection.set(this.currentPagination.currentPage, [...this.selection]);
            } else {
                this.totalSelection.delete(this.currentPagination.currentPage);
            }
        },
        async changePage(page) {
            if (this.loading.getData) return;
            this._saveCurrentSelection();
            if (this.isAuthenticated) {
                await this.getHisData(page);
                this.selection = this.totalSelection.get(page) || [];
            } else {
                this.loading.getData = true;
                setTimeout(() => {
                    this.localPage = page;
                    this.selection = this.totalSelection.get(page) || [];
                    this.loading.getData = false;
                }, 200);
            }
        },
        closeTable() {
            this.$emit('closeTable');
        },
        getAllSelection() {
            this._saveCurrentSelection();
            const allData = [];
            for (const selections of this.totalSelection.values()) {
                allData.push(...selections);
            }
            return allData;
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
            if (this.isAuthenticated) {
                const idJSON = JSON.parse(JSON.stringify(allData.map(item => ({ id: item.id }))));
                const callback = () => {
                    this.clearSelection();
                    this.getHisData(1);
                }
                this.$emit('delectData', idJSON, callback);
            } else {
                const deleteIds = new Set(allData.map(item => item.id));
                this.$emit('deleteLocalData', deleteIds);
                this.clearSelection();
            }
        },
        initLocalDataMap() {
            this.localDataMap.clear();
            this.localFnData.forEach((item, index) => {
                if (!item.id) {
                    item.id = `local-${Date.now()}-${index}`;
                }
                this.localDataMap.set(item.id, item);
            });
        },
        async getHisData(page) {
            if (this.loading.getData) return;
            this.loading.getData = true;
            const { success, data, error } = await getChangeData(page, this.is2D ? 2 : 3);
            if (success) {
                this.fnData = data.fnData;
                this.pagination = data.pagination;
                console.log('获取历史数据成功:', data);
            } else {
                console.log('获取历史数据失败:', error);
            }
            this.loading.getData = false;
        }
    }
}
</script>

<style scoped>
.table .iconfont {
    font-size: 20px;
}

.table th {
    user-select: none;
}
</style>