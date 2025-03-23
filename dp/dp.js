const App = {
  data() {
    return {
      active_section: 0
    };
  },
  watch: {
    active_section(newVal) {
      if (newVal === 0) {
        this.$nextTick(() => {
          this.initSlider();
        });
      } else {
        this.destroySlider();
      }
      this.$nextTick(() => {
          this.setupBackground();
        });
    }
  },
  methods: {
    setupBackground() {
        $(".set-bg").each(function () {
          const bg = $(this).data("setbg");
          if (bg) {
            $(this).css("background-image", `url(${bg})`);
          }
        });
    },
    initSlider() {
        this.setupBackground(); // фоновите изображения трябва да са зададени

        var hero_s = $(".hs-slider");
        hero_s.owlCarousel({
          loop: true,
          margin: 0,
          nav: true,
          items: 1,
          dots: false,
          animateOut: 'fadeOut',
          animateIn: 'fadeIn',
          navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
          smartSpeed: 1200,
          autoHeight: false,
          autoplay: true
        });
    },
    destroySlider() {
      var hero_s = $(".hs-slider");
      if (hero_s.hasClass("owl-loaded")) {
        hero_s.trigger('destroy.owl.carousel');
        hero_s.find('.owl-stage-outer').children().unwrap();
        hero_s.removeClass("owl-center owl-loaded owl-text-select-on");
      }
    }
  },
  mounted() {
    if (this.active_section === 0) {
      this.initSlider();
    }
  }
};
Vue.createApp(App).mount('#app')
