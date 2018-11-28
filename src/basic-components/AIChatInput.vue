<template>
    <div>
        <textarea class='inputer' :value="value" :disabled="disabled" @input="$emit('input',$event.target.value)" @keyup.enter="!$event.ctrlKey?$emit('clickEnter'):null" @keyup.ctrl.enter="addLineBreake" />
    </div>
</template>


<script>
export default {
  name: "AIChatInput",
  data() {
    return {
      // valueData:this.value
    };
  },
  computed: {
    valueData() {
      return this.value; 
    }
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    focusInput() {
      let inputElement = this.$el.firstElementChild;
      inputElement.disabled = false;
      inputElement.focus();
    },
    addLineBreake(){
       var newData = this.valueData+'\n';
      console.log(newData);
      this.$emit('input',newData);
    }
  }
};
</script>

<style lang="scss" scoped>
.inputer {
  width: 100%;
  height: 100%;
  border: none;
  resize: none;
  font-size: 18px;

  &:disabled{
    background: #FFFFFF;
    color: gray;
  }
}

textarea:focus {
  border: none;
  outline: none;
}
</style>

