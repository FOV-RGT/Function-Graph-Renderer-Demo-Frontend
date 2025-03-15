<template>
    <div class="overflow-x-auto">
        <table class="table table-zebra table-md">
            <!-- head -->
            <thead>
                <tr class="text-xl">
                    <th>
                    </th>
                    <th class="text-center">序列号</th>
                    <th class="text-center">方程</th>
                    <th class="text-center">颜色</th>
                    <th class="text-center">维度</th>
                    <th class="text-center">采样点数</th>
                    <th class="text-center">是否可见</th>
                    <th>
                        <icon type="close" class="cursor-pointer text-primary" @click="closeTable"/>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in fnData" :key="index">
                    <th>
                        <label>
                            <input type="checkbox" class="checkbox"/>
                        </label>
                    </th>
                    <td class="text-center text-lg">
                        {{ index + 1 + (pagination.currentPage - 1) * pagination.pageSize }}
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
        <div class="flex justify-center mt-4 mb-4">
            <div class="join">
                <button class="join-item btn" :disabled="pagination.currentPage === 1"
                    @click="changePage(pagination.currentPage - 1)">
                    <icon type="doubleLeft" />
                </button>
                <label class="join-item input">
                    <input v-show="!loading" type="text" class="join rounded-none w-12 text-center" :value.number="pagination.currentPage"
                        @input="debouncedUpdatePage($event.target.value)" >
                    <span v-show="loading" class="loading loading-spinner loading-lg"></span>
                    </input>
                    <span>/</span>
                    <span>{{ pagination.totalPages }}</span>
                </label>
                <button class="join-item btn" :disabled="pagination.currentPage >= pagination.totalPages"
                    @click="changePage(pagination.currentPage + 1)">
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
        fnData: {
            type: Array,
            default: () => []
        },
        pagination: {
            type: Object,
            default: () => ({
                currentPage: 1,
                totalPages: 1
            })
        }
    },
    data() {
        return {
            selected: [],
            loading: true,
        }
    },
    created() {
        this.debouncedUpdatePage = debounce((page) => {
            page = clamp(page, 1, this.pagination.totalPages)
            this.$emit('changePage', page)
        }, 250)
    },
    watch: {
        fnData: {
            handler() {
                this.loading = false;
            },
        }
    },
    methods: {
        selectAll() {
            this.selected = this.data.map(item => item.id)
        },
        selectNone() {
            this.selected = []
        },
        select(data) {
            if (this.selected.includes(data)) {
                this.selected = this.selected.filter(item => item !== data)
            } else {
                this.selected.push(data)
            }
            console.log(this.selected);
        },
        changePage(page) {
            this.loading = true;
            this.$emit('changePage', page)
        },
        closeTable() {
            this.$emit('closeTable')
        }
    }
}
</script>

<style scoped>
@import url('../assets/componentCss/hisDataTable.css');
</style>