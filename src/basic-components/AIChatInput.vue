<template>
    <div>
        <textarea class='inputer' :value="value" :disabled="disabled" @input="$emit('input',$event.target.value)" @keyup.ctrl.enter="$emit('clickEnter')" />
    </div>
</template>


<script>
export default {
  name: "AIChatInput",
  data() {
    return {};
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
      // debugger;
      let inputElement = this.$el.firstElementChild;
      inputElement.disabled = false;
      inputElement.focus();
      // console.log(this.$el.firstElementChild);
      // console.log(123)
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
}

textarea:focus {
  border: none;
  outline: none;
}
</style>

