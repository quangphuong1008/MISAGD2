<template>
  <div class="m-popup">
    <div class="m-popup-content" :style="{ width: '900px' }">
      <div class="m-popup__header">
        <div class="m-popup-tittle">Thông tin nhà cung cấp</div>
        <div class="al_center">
          <BaseRadioGroup class="custom-padding" :items="listAccount" />
        </div>
        <div class="al_center">
          <Checkbox class="custom-padding" :label="'Là khách hàng'" />
        </div>
        <div class="m-popup-close">
          <div class="m-popup-btn help" @click="handleHelpPopup"></div>
          <div class="m-popup-btn close" @click="handleClosePopup"></div>
        </div>
      </div>
      <div class="m-popup-body">
        <div class="grid__row" style="position: relative">
          <div class="w-1/2 p-r-26">
            <div class="grid__row">
              <TextField class="w-2/5 p-r-6" :label="'Mã số thuế'" />
              <TextField
                class="w-3/5"
                :label="'Mã nhà cung cấp'"
                :required="true"
              />
            </div>
            <TextField class="grid__row" :label="'Tên nhà cung cấp'" />
            <TextField
              class="grid__row"
              :label="'Địa chỉ'"
              :height="'55px'"
              :placeholder="'VD: Số 82 Duy Tân, Dịch Vọng Hậu, Cầu Giấy, Hà Nội'"
            />
          </div>
          <div
            class="w-1/2"
            style="height: 194.3px; position: absolute; top: 0px; left: 50%"
          >
            <div class="grid__row">
              <TextField class="w-2/5 p-r-6" :label="'Điện thoại'" />
              <TextField class="w-3/5" :label="'Webside'" />
            </div>
            <Combobox2Colum
              class="grid__row"
              :label="'Nhóm nhà cung cấp'"
              :textColum="'nhóm KH, NCC'"
              :icon="true"
            />
            <Combobox2Colum
              class="grid__row"
              :label="'Nhân viên mua hàng'"
              :textColum="'nhân viên'"
              :icon="true"
            />
          </div>
        </div>
        <div class="popup-tab">
          <div class="tab">
            <ul class="ul-tab">
              <li class="ms-tabs-li select">
                <div type="button" class="ms-tabs-btn">Liên hệ</div>
              </li>
              <li class="ms-tabs-li">
                <div type="button" class="ms-tabs-btn">
                  Điều khoản thanh toán
                </div>
              </li>
              <li class="ms-tabs-li">
                <div type="button" class="ms-tabs-btn">Tài khoản ngân hàng</div>
              </li>
              <li class="ms-tabs-li">
                <div type="button" class="ms-tabs-btn">Liên hệ</div>
              </li>
              <li class="ms-tabs-li">
                <div type="button" class="ms-tabs-btn">Liên hệ</div>
              </li>
            </ul>
          </div>
          <div class="slot-tab">
            <div v-if="true">
              <div class="grid__row" style="position: relative; margin: 10px">
                <div class="w-1/2 p-r-26">
                  <div class="grid__row" style="position: relative">
                    <BaseCombobox
                      class="w-2/5 p-r-6"
                      :label="'Người liên hệ'"
                      :datas="listName"
                    />
                    <TextField
                      class="w-3/5"
                      style="position: absolute; top: 21px; right: 0"
                      :placeholder="'Họ và tên'"
                    />
                  </div>
                  <TextField class="grid__row" :placeholder="'Email'" />
                  <TextField
                    class="grid__row w-1/2"
                    :placeholder="'Số điện thoại'"
                  />
                </div>
                <div
                  class="w-1/2"
                  style="
                    height: 194.3px;
                    position: absolute;
                    top: 0px;
                    left: 50%;
                  "
                >
                  <div class="grid__row">
                    <TextField class="grid__row" :label="'Đại diện theo PL'" />
                  </div>
                </div>
              </div>
            </div>
            <div v-if="false">
              <div
                class="grid__row"
                style="
                  position: relative;
                  margin: 10px;
                  justify-content: normal;
                "
              >
                <Combobox2Colum
                  class="grid__row w-1/4 p-r-6"
                  style="margin-bottom: -13px"
                  :label="'Điều khoản thanh toán'"
                  :textColum="'điều khoản thanh toán'"
                  :icon="true"
                />
                <TextField class="w-1/4 p-r-6" :label="'Số ngày được nợ'" />

                <TextField class="w-1/4 p-r-6" :label="'Số nợ tối đa'" />
              </div>
              <div
                class="grid__row"
                style="
                  position: relative;
                  margin: 10px;
                  justify-content: normal;
                "
              >
                <Combobox2Colum
                  class="grid__row w-1/4 p-r-6"
                  style="margin-bottom: -13px"
                  :label="'Tài khoản nợ công phải trả'"
                  :textColum="'tài khoản'"
                  :icon="false"
                  :width="'300px'"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="m-popup-footer">
        <div class="divide"></div>
        <div class="grid__row" style="margin-bottom: 10px">
          <div class="w-1/2">
            <Button
              class="m-popup-footer-btn"
              :color="'transparent'"
              @handleClick="showPopup = false"
              >Hủy</Button
            >
          </div>
          <div>
            <Button
              class="m-popup-footer-btn"
              :color="'transparent'"
              @handleClick="handleBtnSave"
              >Cất</Button
            >
            <Button
              class="m-popup-footer-btn"
              :color="'#2ca01c'"
              style="color: #fff; border: none"
              @handleClick="handleBtnSaveAndAdd"
              >Cất và Thêm</Button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Checkbox from "../../components/base/BaseCheckbox.vue";
import Button from "../../components/base/BaseButton.vue";
import TextField from "../../components/base/BaseTextField.vue";
import BaseRadioGroup from "../../components/base/BaseRadioGroup.vue";
import Combobox2Colum from "../../components/account_object/ComboboxAccountGroup.vue";
import BaseCombobox from "../../components/base/BaseCombobox.vue";
export default {
  components: {
    Checkbox,
    Button,
    TextField,
    BaseRadioGroup,
    Combobox2Colum,
    BaseCombobox,
  },
  props: {},
  data() {
    return {
      listAccount: [
        {
          id: "0",
          name: "Tổ chức",
        },
        {
          id: "1",
          name: "Cá nhân",
        },
      ],

      listName: [
        {
          value: "Anh",
        },
        {
          value: "Chị",
        },
      ],
    };
  },
};
</script>

<style scope>
@import url("../../assets/styles/base/popup.css");

.m-popup-footer .divide {
  margin: 32px 0 20px 0;
  border-top: 1px solid #e0e0e0;
}
.m-popup-body {
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 20px;
}
.custom-padding {
  padding-left: 19.5px;
  padding-right: 19.5px;
}
.m-popup-tittle {
  display: flex;
  align-items: center;
}
.al_center {
  align-items: center;
  display: flex;
}
.m-popup-close {
  display: flex;
}
.m-popup-close .m-popup-btn {
  cursor: pointer;
  height: 24px;
  width: 24px;
}
.m-popup-close .m-popup-btn + .m-popup-btn {
  margin-left: 6px;
}
.m-popup-content {
  background-color: #fff;
  border-radius: 5px;
  animation: scale 0.5s;
}

.m-popup__header {
  display: flex;
  justify-content: space-between;
}
.m-popup__header .m-popup-tittle {
  padding: 20px 12px 20px 32px;
  font-size: 24px;
  color: #111;
  font-weight: 700;
  font-family: Notosans-Regular;
}
.m-popup__header .m-popup-close {
  padding: 12px;
}
.m-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadein 0.5s;
  z-index: 999;
}
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
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(1turn);
  }
}
@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes scale {
  from {
    transform: scale(0.7);
  }
  to {
    transform: scale(1);
  }
}
</style>