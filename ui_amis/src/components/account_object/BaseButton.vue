<template>
  <div class="btn__">
    <div class="btn-add">
        <span>Thêm</span>
      <div
        class="icon-16 dropdown-while" :class="{'rotate': isShow}"
        v-on:click="isShow = !isShow"
      ></div>
    </div>
    <div class="multi-option" v-if="isShow" @click="inputExcel">
      <p>Nhập từ Excel</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
    };
  },
  methods: {

    /**
     * Thuc hien xoa
     */
    inputExcel(){
      this.$emit('inputExcel')
      this.isShow = false
    }
  },
  
};
</script>

<style>
.rotate{
  transform: rotateX(3.142rad);
}
.btn__{
  position: relative;

}
.btn-add {
  width: 120px;
  height: 36px;
  background-color: #ffffff;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  border-radius: 20px;
  border: 2px solid #3b3c3f;
  cursor: pointer;
}
.btn-add:hover {
  background-color: #d2d3d6;
}
.btn-add span {
  padding: 4px 4px 4px 16px;
  font-family:  Notosans-Regular;
  font-size: 13px;
  text-align: center;
  font-weight: 600;
}
.multi-option {
  position: absolute;
     top: 38px;
    left: 10px;
  height: 34px;
  width: 108px;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #babec5;
  z-index: 999;
  cursor: pointer;
}
.multi-option p {
  font-size: 13px;
  text-decoration: none solid rgb(17, 17, 17);
  text-align: left;
  padding: 5px 10px 5px 10px;
}
.multi-option:hover {
  background-color: #e8e9ec;
}
.icon-16 {
  height: 16px;
  width: 16px;
  min-width: 16px;
  min-height: 16px;
  
}
</style>