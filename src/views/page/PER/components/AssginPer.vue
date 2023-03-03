<template>
  <a-modal
    :dialog-style="{ top: '200px' }"
    :body-style="bodystyle"
    class="modal"
    title="分配权限"
    :visible="modalVisible"
    @cancel="handleCancel"
    @close="handleCancel"
    width="600px"
  >
    <a-tree
      checkStrictly
      v-if="treeData.length"
      :replaceFields="replaceFields"
      v-model="checkedKeys"
      checkable
      :auto-expand-parent="autoExpandParent"
      :selected-keys="selectedKeys"
      :tree-data="treeData"
      @select="onSelect"
    />
    <template slot="footer">
      <a-button key="submit" type="primary" @click="handleSubmit">
        确定
      </a-button>
      <a-button key="back" @click="handleCancel"> 取消 </a-button>
    </template>
  </a-modal>
</template>

<script>
import store from '@/store/index.js'
import { getTreeData, assginPer } from '@/api/api.js'
export default {
  name: "AssginPer",
  props: {
    modalVisible: {
      type: Boolean
    },
    companyName: {
      type: String
    }
    // // zcDetail: {
    // //   type: Object,
    // // }
  },
  data () {
    return {
      userId: null,
      replaceFields: {
        children: 'children',
        title: 'label',
        key: 'id',
        value: 'value'
      },
      treeData: [

      ],
      bodystyle: {
        height: '480px',
        overflow: 'hidden',
        overflowY: 'scroll',
      },
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [],
      selectedKeys: [],
    }
  },
  watch: {
    checkedKeys (val) {
    },
  },
  methods: {
    // 获取树状图列表
    getTreeList (userId) {
      this.userId = userId
      getTreeData({ userId: userId }).then((res) => {
        this.treeData = res.data.data.menus
        this.treeData[0].disableCheckbox = true
        this.treeData[0].children.forEach(item => {
          item.disableCheckbox = true
        })
        if (this.companyName === '上海上勤（集团）有限公司' || this.companyName === '上勤集团总部') {
          this.checkedKeys = [1, 101, 102, ...res.data.data.checkedKeys]
        } else {
          this.checkedKeys = [1, 102, ...res.data.data.checkedKeys]
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // onExpand (expandedKeys) {
    //   // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    //   // or, you can remove all expanded children keys.
    //   this.expandedKeys = expandedKeys
    //   this.autoExpandParent = false
    // },
    onCheck (checkedKeys) {
      this.checkedKeys = checkedKeys
    },
    onSelect (selectedKeys, info) {
      this.selectedKeys = selectedKeys
    },
    handleCancel () {
      // this.$emit('update:modalVisible', false)
      this.checkedKeys = []
      this.$emit('resetModalVisible', false)
    },
    async handleSubmit () {
      if (!this.checkedKeys.checked) {
        assginPer({
          menuIds: this.checkedKeys,
          userId: this.userId
        }).then((res) => {
          this.$message.success('分配权限成功')
          this.$emit('resetModalVisible', false)
        }).catch((err) => {
          console.log(err)
        })
      } else {
        assginPer({
          menuIds: this.checkedKeys.checked,
          userId: this.userId
        }).then((res) => {
          this.$message.success('分配权限成功')
          this.$emit('resetModalVisible', false)
        }).catch((err) => {
          console.log(err)
        })
      }
      setTimeout(() => {
        store.dispatch('getUserAction')
      }, 100)
    }
  }
}
</script>

<style  scoped lang="scss">
:deep(.ant-modal-body) {
  height: 100px !important;
}
.modal {
  position: relative;
}
.icon {
  z-index: 999;
  display: inline-block;
  cursor: pointer;
  position: absolute;
  right: 30px;
  top: 220px;
}
.icon:hover {
  color: #f62f2f;
}
/* .icon {
  z-index: 999;
  position: fixed;
  right: 0;
  top: 0;
} */
.err {
  border-color: #f62f2f !important;
}
</style>
