export default AnAlertBarManager = {
    currentBar: null,

    registerAlertBar(ref) {
        this.currentBar = ref;
    },

    showAlertBar(params) {
        this.currentBar.show(params);
    },
};
