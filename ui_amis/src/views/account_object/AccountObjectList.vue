<template>
  <div class="m-employee-view">
    <div v-if="Loading" class="loading">
      <div class="loading__icon"></div>
    </div>
    <div class="m-employee-view__header">
      <div class="m-employee-view__tittle">Danh sách nhà cung cấp</div>
      <Button
        :color="'#2ca01c'"
        style="border-radius: 2px"
        @handleClick="handleBtnAdd"
        >Thêm mới nhân viên</Button
      >
    </div>
    <div class="overview">
      <div class="w-1/3 pd-t-8 over-view">
        <div style="background: #ff7f2c; height: 100%"></div>
      </div>
      <div class="w-1/3 pd-t-8 px-2 over-view">
        <div style="background: #b8bcc3; height: 100%"></div>
      </div>
      <div class="w-1/3 pd-t-8 over-view">
        <div style="background: #74cb2f; height: 100%"></div>
      </div>
    </div>
    <div class="m-employee-view__body">
      <div class="grid__row" style="padding: 0 16px">
        <div class="grid__row" style="padding-bottom: 0px !important">
          <DropBox @multiDelete="DeleteAll" :isShow="showBtnDeleteAll" />
        </div>
        <div class="grid__row" style="justify-content: right; padding: 16px 0">
          <TextInput
            :hintText="'Tìm theo mã, tên nhân viên'"
            :iconClass="'search'"
            v-model="SearchText"
          />

          <div class="btn-24 refresh-ico" @click="handleBtnRefresh"></div>
          <a> <div class="btn-24 excel" @click="exportExcel"></div></a>
          <div class="btn-24 setting_list" @click="handleBtnRefresh"></div>
        </div>
      </div>
      <Table
        :fields="fields"
        :data="Datas"
        :btnText="'Lập CT mua hàng'"
        @handleDeleteButtonClick="handleTableDelete"
        @handleEditButtonClick="updateEmployee"
        @insertEmployeeIdToListId="insertEmployeeIdToListId"
        @deleteEmployeeIdToListId="deleteEmployeeIdToListId"
        @handleCloneBtnClick="handleCloneBtnClick"
      ></Table>
    </div>
    <div class="m-employee-view__footer">
      <div class="left-pagination">
        <div class="total-record">
          Tổng số: <b>{{ TotalRecord }}</b> bản ghi
        </div>
      </div>
      <div class="right-pagination">
        <ComboboxPanigaion
          :ListItem="[
            '10 bản ghi trên trang',
            '20 bản ghi trên trang',
            '30 bản ghi trên trang',
            '50 bản ghi trên trang',
            '100 bản ghi trên trang',
          ]"
          v-if="true"
          @handleSelect="changeRecordNumber"
        />
        <PageNumberPanigation
          :totalPage="TotalPage"
          @handleSelectPanigation="handleSelectPanigation"
        />

      </div>
     
    </div>
     <AccountObjectDetail
      v-if="true"/>
    <div id="toast"></div>
  </div>
</template>

<script>
import Resource from "../../assets/js/resource";
import Button from "../../components/account_object/BaseButton.vue";
import TextInput from "../../components/base/BaseTextInput.vue";
import Table from "../../components/account_object/BaseCustomTable.vue";
import ComboboxPanigaion from "../../components/custom/ComboboxPanigation.vue";
import PageNumberPanigation from "../../components/custom/PageNumberPanigation.vue";
import DropBox from "../../components/custom/DropBox.vue";
import AccountObjectDetail from './AccountObjectDetail.vue';

export default {
  components: {
    Button,
    TextInput,
    Table,
    ComboboxPanigaion,
    PageNumberPanigation,
    DropBox,
    AccountObjectDetail,
  },
  created() {
    var me = this;
    me.loadData();
  },
  data() {
    return {
      // Màn hình load
      Loading: false,
      // Phân trang:
      PageNumber: 1,
      RecordNumber: 10,
      TotalRecord: null,
      TotalPage: 3,
      // Tìm kiếm:
      SearchText: "",
      // Validate Mode;
      ValidateMode: false,
      FocusInput: false,
      // MessageBox:
      MesageBoxText: "",
      MessageBoxType: "warning",
      Datas: {
        name:"quang"
      },
      Validate: true,
      /* Thông tin cần dùng v-model */
      EmployeeCode: "", // Mã nhân viên
      FullName: "", // Họ và Tên
      DateOfBirth: null, // Ngày sinh
      Gender: null, // Giới tính
      DepartmentId: "", // Đơn vị
      IdentityNumber: "", // Số CMND
      IdentityDate: null, // Ngày cấp CMND
      IdentityPlace: "", // Nơi cấp CMND
      PositionName: "", // Chức danh
      Address: "", // Địa chỉ
      PhoneNumber: "", // SĐT Di Động
      Email: "", // Email
      BankAccount: "", // Tài khoản ngân hàng
      LandlinePhoneNumber: "", // Số Đt cố định
      BankName: "", // Tên ngân hàng
      BankBranch: "", // chi nhanh tài khoản ngân hàng
      /*---------------------*/
      showMsg: false, // show Message
      showMsgCloseForm: false, //
      EmployeeEditId: null,
      // Lưu lại Employee cần xóa
      EmployeeCodeDelete: null,
      EmployeeIdDelete: null,
      ListEmployeeIdDelete: [],
      // ----------------------------
      resource: Resource,
      timemout: null,
      FormMode: null,
      Departments: [],
      deletes: false,
      showPopup: false,
      showBtnDeleteAll: true,
      employees: [],
      tempEmployee: {},
      employeeToString: null,
      checkEmployeeToString: null,
      listGender: [
        {
          id: "0",
          name: Resource["VN"].Gender.Male,
        },
        {
          id: "1",
          name: Resource["VN"].Gender.Female,
        },
        {
          id: "2",
          name: Resource["VN"].Gender.Other,
        },
      ],
      fields: [
        {
          text: "MÃ NHÀ CUNG CẤP",
        },
        {
          text: "TÊN NHÀ CUNG CẤP",
        },
        {
          text: "ĐỊA CHỈ",
        },
        {
          text: "MÃ SỐ THUẾ",
        },
        {
          text: "SĐT",
        },
        {
          text: "CMTND",
        },
      ],
    };
  },
};
</script>

<style scoped>
@import url("../../assets/styles/components/toast/toast.css");

.m-employee-view {
  background-color: #f4f5f8;
  flex: 1;
  max-height: calc(100vh - 48px);
  overflow: auto;
  position: relative;
}
.m-employee-view .m-employee-view__header {
  padding-left: 20px;
  padding-top: 24px;
  padding-bottom: 11px;
  padding-right: 30px;
  display: flex;
  justify-content: space-between;
}
.m-employee-view .m-employee-view__header .m-employee-view__tittle {
  color: #111;
  font-family: Notosans-Regular;
  font-size: 24px;
  font-weight: 700;
  line-height: normal;
}
.m-employee-view .m-employee-view__body {
  background-clip: border-box;
  box-sizing: border-box;
  margin-left: 20px;
  margin-top: 20px;
  margin-right: 30px;
  background-color: #fff;
}
.m-employee-view .m-employee-view__footer {
  position: sticky;
  bottom: 0;
  padding: 12px;
  background-color: #fff;
  margin-left: 20px;
  margin-right: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
}
.m-employee-view .m-employee-view__footer .right-pagination {
  display: flex;
  align-items: center;
}
.btn-24 {
  width: 24px;
  height: 24px;
  padding: 0 6px;
  box-sizing: content-box;
  cursor: pointer;
}

.w-1\/2 {
  width: 50%;
}
.w-1\/3 {
  width: 33.33%;
}
.w-2\/5 {
  width: 40% !important;
}
.p-r-6 {
  padding-right: 6px;
}
.w-3\/5 {
  width: 60%;
}
.p-r-26 {
  padding-right: 26px;
}
.w-1\/4 {
  width: 25%;
}
.pd-t-8 {
  padding-top: 8px;
}
.px-2 {
  padding-left: 0.5rem !important;
  padding-right: 0.5rem !important;
}
.overview {
  height: 72px;
  margin-left: 20px;
  margin-top: 30px;
  margin-right: 30px;
  display: flex;
}
.over-view {
  box-sizing: border-box;
  height: 100%;
}
.m-text-field input[type="date"] {
  outline: none;
  font-size: 13px;
  border-radius: 2px;
  border: 1px solid #babec5;
  height: var(--input-height);
  padding-left: 10px;
  padding-right: 12px;
  box-sizing: border-box;
  width: 100%;
  text-transform: uppercase;
  font-style: italic;
  font-family: "Notosans-Regular" !important;
}

.m-text-field input[type="date"]:hover:not(:focus) {
  outline: 1px solid #e2e2e2;
}
.m-text-field input[type="date"]:focus {
  border: 1px solid #2ca01c;
}
.m-popup-footer-btn {
  border: 1px solid #8d9096;
  color: #111;
  border-radius: 3px;
  height: 34px;
  padding: 6px 16px;
}
.m-popup-footer-btn + .m-popup-footer-btn {
  margin-left: 6px;
}
.m-input-error {
  border: 1px solid red !important;
}
.loading {
  position: fixed;
  background: rgba(255, 255, 255, 0.2);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loading__icon {
  background: transparent url("../../assets/loading.svg") no-repeat center;
  width: 50px;
  height: 50px;
  transition: all 0.3s ease;
  animation: rotate 1s ease infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(1turn);
  }
}
</style>
