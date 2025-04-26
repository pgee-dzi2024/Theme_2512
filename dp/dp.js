const App = {
    data() {
        return {
            active_section: 0,
            bmi:'', //BMI (индекс на телесната маса)
            wCat:'2', //Теглова категория
            bmr:'3', //BMR (базов метаболитен ритъм)
            calB:'4', //Kалориен баланс
            height:'',
            weight:'6',
            age:'7',
            sex:'male',
            activity:'1.2',
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
    computed: {
        numericAge() {
            const parsedAge = parseInt(this.age, 10);
            return isNaN(parsedAge) ? 20 : parsedAge; // Ако не може да се преобразува, връща 20
        },
        numericHeight() {
            const parsedHeight = parseInt(this.height, 10);
            return isNaN(parsedHeight) ? 170 : parsedHeight; // Ако не може да се преобразува, връща 170
        },
        numericWeight() {
            const parsedWeight = parseInt(this.weight, 10);
            return isNaN(parsedWeight) ? 60 : parsedWeight; // Ако не може да се преобразува, връща 60
        },
        numericActivity() {
            const parsedActivity = parseFloat(this.activity);
            return isNaN(parsedActivity) ? 1.375 : parsedActivity;
        },
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
        },
        calculate(){
            const numericBMI = this.numericWeight / ((this.numericHeight/100) ** 2); // Тегло (kg) / Ръст (m)^2
            console.log(numericBMI)
            this.bmi = `${numericBMI.toFixed(2)}`; // Закръгляне до две цифри след десетичната точка
            if (numericBMI<18.5){this.wCat = 'Недостатъчно тегло'}
            else if (numericBMI<25.0){this.wCat = 'Нормално тегло'}
            else if (numericBMI<30.0){this.wCat = 'Наднормено тегло'}
            else if (numericBMI<35.0){this.wCat = 'Затлъстяване степен I'}
            else if (numericBMI<40.0){this.wCat = 'Затлъстяване степен II'}
            else {this.wCat = 'Затлъстяване степен III'}

            let numericBMR = 0 // Формула на Харис-Бенедикт
            if (this.sex==='male'){ //За мъже: BMR = 88.362 + (13.397×тегло в кг) + (4.799×височина в см) − (5.677×възраст в години)
                numericBMR = 88.362+13.397*this.numericWeight+4.799*this.numericHeight-5.677*this.numericAge
            } else { // За жени: BMR = 447.593 + (9.247×тегло в кг) + (3.098×височина в см) − (4.330×възраст в години)
                numericBMR = 447.593+9.247*this.numericWeight+3.098*this.numericHeight-4.330*this.numericAge
            }
            this.bmr = `${numericBMR.toFixed(2)}`; // Закръгляне до две цифри след десетичната точка
            const numericCal = numericBMR * this.numericActivity
            this.calB = `${numericCal.toFixed(2)}`
        },
    },
    mounted() {
        if (this.active_section === 0) {
          this.initSlider();
        }
    }
};
Vue.createApp(App).mount('#app')
