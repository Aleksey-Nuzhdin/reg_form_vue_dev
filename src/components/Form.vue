<template>
  <div class="wrap"
    ref="wrap"
    @click.self="isDropSelectGroup = false"
  >
    <transition name="toast">
      <div v-if="isShowTost" class="toast__mesage">
        Клиент создан
      </div>
    </transition>
    <form class="form" novalidate
      @submit.prevent="regSubmit"
      :style="{marginTop:moveTopForm + 'px'}"
    >
      <transition name="step">
        <div class="page_wrap" 
          v-show="step === 1"
        >
          <h2 class="form__title">Создание клиента</h2>

          <div class="group__input">
            <label for="surname" class='label'>Фамилия<span class="color_red">*</span></label>
            <input type="text" id="surname" 
              v-model.trim="dataSet.surname"
              @blur="$v.dataSet.surname.$touch(), saveInLocalStorage()"
              :class="{invalid:((!$v.dataSet.surname.required && $v.dataSet.surname.$dirty)
                || (!$v.dataSet.surname.alpha && $v.dataSet.surname.$dirty)
              )}"
            />
            <span class="error__text"
              v-if="!$v.dataSet.surname.required && $v.dataSet.surname.$dirty"
            >
              Напишите фамилию
            </span>
            <span class="error__text"
              v-if="!$v.dataSet.surname.alpha && $v.dataSet.surname.$dirty"
            >
              Фамилия не должна содержать цифр или специальных символов
            </span>
          </div>

          <div class="group__input">
            <label for="name" class='label'>Имя<span class="color_red">*</span></label>
            <input type="text" id="name" 
              v-model.trim="dataSet.name"
              @blur="$v.dataSet.name.$touch(), saveInLocalStorage()"
              :class="{invalid:((!$v.dataSet.name.required && $v.dataSet.name.$dirty)
                || (!$v.dataSet.name.alpha && $v.dataSet.name.$dirty)
              )}"
            />
            <span class="error__text"
              v-if="!$v.dataSet.name.required && $v.dataSet.name.$dirty"
            >
              Напишите имя
            </span>
            <span class="error__text"
              v-if="!$v.dataSet.name.alpha && $v.dataSet.name.$dirty"
            >
              Имя не должно содержать цифр или специальных символов
            </span>
          </div>

          <div class="group__input">
            <label for="middleName" class='label'>Отчество</label>
            <input type="text" id="middleName" 
              v-model.trim="dataSet.middleName"
              @blur="$v.dataSet.middleName.$touch(), saveInLocalStorage()"
              :class="{invalid:((!$v.dataSet.middleName.alpha && $v.dataSet.middleName.$dirty)
              )}"
            />
            <span class="error__text"
              v-if="!$v.dataSet.middleName.alpha && $v.dataSet.middleName.$dirty"
            >
              Отчество не должно содержать цифр или специальных символов
            </span>
          </div>

          <div class="group__DOB_gender">
            <div class="group__input">
              <label for="DOB" class='label'>Дата рождения<span class="color_red">*</span></label>
              <input type="date" id="DOB"
                v-model="dataSet.DOB"
                @blur="$v.dataSet.DOB.$touch(), saveInLocalStorage()"
                :class="{invalid:(!$v.dataSet.DOB.required && $v.dataSet.DOB.$dirty)}"
               />
              <span class="error__text"
                v-if="!$v.dataSet.DOB.required && $v.dataSet.DOB.$dirty"
              >
                Укажите дату
              </span>
            </div>
            <div class="group__input">
              <label for="gender" class='label'>Пол</label>
              <div class="wrap_gender_input">
                <label for="genderM" class='label__gender male'
                  @click="dataSet.genderCheckM = true
                          ,dataSet.genderCheckF = false
                          ,saveInLocalStorage()"
                  :class="{activ:dataSet.genderCheckM}"
                >Мужчина</label> 
                <input type="radio" id="genderM" name='gender' />
                <input type="radio" id="genderF" name='gender' />
                <label for="genderF" class='label__gender female'
                  @click="dataSet.genderCheckM = false
                          ,dataSet.genderCheckF = true
                          ,saveInLocalStorage()"
                  :class="{activ:dataSet.genderCheckF}"
                >Женщина</label>
              </div>
            </div>
          </div>
          <span class="span__prompt">
            Поля отмеченные <span class="color_red">*</span>, обязательны для заполнения
          </span>
          <div class="btn__wrap">
            <button @click.prevent="nextStep" class='btn__step'
              :class='{activ: ( 
                !this.$v.dataSet.name.$invalid &&
                !this.$v.dataSet.surname.$invalid &&
                !this.$v.dataSet.middleName.$invalid &&
                !this.$v.dataSet.DOB.$invalid

              )}'
            >Далее</button>
          </div>
        </div>
      </transition>
      <transition name="step">
        <div class="page_wrap" 
          v-show="step === 2"
          @click="isDropSelectGroup = false"
        >
          <h2 class="form__title">Даные</h2>

          <div class="wp__text">
            <div class="group__input"
              @click.stop=""
              @keydown.esc='isDropSelectGroup = false'
            >
              <label for="gr" class='label'>Группа клиентов<span class="color_red">*</span></label>
              <div class="client_group"
                @click.prevent.self="isDropSelectGroup = false"
              >
                <div class="client_group_item"
                  v-for="(val, ind) of dataSet.selectGroupClient" :key='ind'
                > 
                  {{val}}
                  <a class="delete__client_group_item"
                    @click.prevent='deleteClientInGroup(ind),saveInLocalStorage()'
                  ></a>
                </div>
              </div>
              <input type="text" id="gr" 
                @click.prevent.self="isDropSelectGroup = !isDropSelectGroup"
                :class="{invalid:(!$v.coutGroup.minValue && isMinValCheck)}"
              />
              <label for="gr" class="arrow_drop"
                @click.prevent.self="isDropSelectGroup = !isDropSelectGroup"
                :class='{drop:isDropSelectGroup}'
              ></label>
              <div
                class='drom_select_group'
                :class='{drop:isDropSelectGroup}'
                @click.prevent.self="isDropSelectGroup = !isDropSelectGroup"              
              >

                <ul class='list__clien_group'
                  :class='{drop:isDropSelectGroup}'
                  @click.stop=""
                > 
                  <label for='gr' 
                    class='item__clien_group'
                    v-for="(val, ind) of setGroupClient" :key='ind'
                    :value='val.title'  
                    :id='val.title' 
                    :class='{activ:val.activ}'
                    @click.prevent="addClientInGroup(ind),saveInLocalStorage()"
                    
                  >
                    {{val.title}}
                  </label>
                </ul>
              </div>
            </div>
            <span class="error__text wp__text"
                v-if="!$v.coutGroup.minValue && isMinValCheck"
              >
                Выберете хотябы одну категорию
            </span>
          </div>

          <div class="group__input">
            <label for="doctor" class='label'
              @click="isDropSelectDoctor = !isDropSelectDoctor"
            >Лечащий врач</label>
            <label for="doctor" class='arrow_drop'
              :class="{drop:isDropSelectDoctor}"
              @click="isDropSelectDoctor = !isDropSelectDoctor"
            ></label>
            <select name="doctor" id='doctor'
              v-model='dataSet.doctor'
              @click="isDropSelectDoctor = !isDropSelectDoctor, saveInLocalStorage()"
            >
              <option value="Иванов">Иванов</option>
              <option value="Захаров">Захаров</option>
              <option value="Чернышева">Чернышева</option>
            </select>    
          </div>
      
          <div class="group__input">
            <label for="numberPhone" class='label'>Номер телефона<span class="color_red">*</span></label>
            <input type="text" id="numberPhone" 
              v-model.trim="dataSet.numberPhone"
              @blur="$v.dataSet.numberPhone.$touch(), saveInLocalStorage()"
              :class="{invalid:((!$v.dataSet.numberPhone.required && $v.dataSet.numberPhone.$dirty)
                || (!$v.dataSet.numberPhone.minLength && $v.dataSet.numberPhone.$dirty)
                || (!$v.dataSet.numberPhone.numeric && $v.dataSet.numberPhone.$dirty)
                || (!$v.dataSet.numberPhone.minValue && $v.dataSet.numberPhone.$dirty)
                || (!$v.dataSet.numberPhone.maxValue && $v.dataSet.numberPhone.$dirty)
                || (!$v.dataSet.numberPhone.maxLength && $v.dataSet.numberPhone.$dirty)
                || (!$v.dataSet.numberPhone.minLength && $v.dataSet.numberPhone.$dirty)
              )}"
              
            />

            <span class="error__text"
              v-if="!$v.dataSet.numberPhone.required && $v.dataSet.numberPhone.$dirty"
            >
              Укажите телефон
            </span>
            <span class="error__text"
              v-else-if="!$v.dataSet.numberPhone.numeric && $v.dataSet.numberPhone.$dirty"
            >
              Номер должен состоять только из цифр
            </span>
            <span class="error__text"
              v-else-if="!$v.dataSet.numberPhone.minLength && $v.dataSet.numberPhone.$dirty"
            >
              Слишком короткий номер
            </span>
            <span class="error__text"
              v-else-if="!$v.dataSet.numberPhone.maxLength && $v.dataSet.numberPhone.$dirty"
            >
              Слишком длинный номер
            </span>
            <span class="error__text"
              v-else-if="(!$v.dataSet.numberPhone.maxValue && $v.dataSet.numberPhone.$dirty)
                      || (!$v.dataSet.numberPhone.minValue && $v.dataSet.numberPhone.$dirty)
              "
            >
              Номер должен начинаться с 7
            </span>
            <span class="prompt__text"
              v-else
            >
              Введите номер в формате 71234567890
            </span>
          </div>
          
          <div class="group__input group__input_sms">
            <label for="sms" class='label'
              @click='dataSet.smsCheck =!dataSet.smsCheck, saveInLocalStorage()'
            >Не отправлять СМС</label>
            <label for="sms" class='chekbox_sms'
              @click='dataSet.smsCheck =!dataSet.smsCheck, saveInLocalStorage()'
              :class='{activ:dataSet.smsCheck}'
            >
            <div class="icon_chek_delet"
              :class='{activ:dataSet.smsCheck}'
            ></div>
            </label>
            
            <input type="checkbox" id="sms" name="sms" />
          </div>

          <div class="btn__wrap">
            <button @click.prevent="previousStep" class='btn__step'>Назад</button>
            <button @click.prevent="nextStep" class='btn__step'
              :class='{activ: ( 
                !this.$v.dataSet.numberPhone.$invalid &&
                !this.$v.coutGroup.$invalid

              )}'
            >Далее</button>
          </div>
        </div>
      </transition>

      <transition name="step">
        <div class="page_wrap" 
          v-show="step === 3"
        >
          <h2 class="form__title">Адрес</h2>

          <div class="group__input">
            <label for="coutry" class='label'>Страна</label>
            <input type="text" id="coutry"
              v-model.trim="dataSet.coutry"
              @blur="$v.dataSet.coutry.$touch(), saveInLocalStorage()"
              :class="{invalid:(!$v.dataSet.coutry.alpha && $v.dataSet.coutry.$dirty)}"
            />
            <span class="error__text"
              v-if="!$v.dataSet.coutry.alpha && $v.dataSet.coutry.$dirty"
            >
              Название стрны не должно содержать цифр или специальных символов
            </span>
          </div>

          <div class="group__input">
            <label for="region" class='label'>Область</label>
            <input type="text" id="region" 
              v-model.trim="dataSet.region"
              @blur="$v.dataSet.region.$touch(), saveInLocalStorage()"
              :class="{invalid:(!$v.dataSet.region.alpha && $v.dataSet.region.$dirty)}"
            />
            <span class="error__text"
              v-if="!$v.dataSet.region.alpha && $v.dataSet.region.$dirty"
            >
              Название региона не должно содержать цифр или специальных символов
            </span>
          </div>

          <div class="group__input">
            <label for="city" class='label'>Город<span class="color_red">*</span></label>
            <input type="text" id="city" 
              v-model.trim="dataSet.city"
              @blur="$v.dataSet.city.$touch(), saveInLocalStorage()"
              :class="{invalid:( (!$v.dataSet.city.alpha && $v.dataSet.city.$dirty)
                              || (!$v.dataSet.city.required && $v.dataSet.city.$dirty)
              )}"
            />
            <span class="error__text"
              v-if="!$v.dataSet.city.alpha && $v.dataSet.city.$dirty"
            >
              Название города не должно содержать цифр или специальных символов
            </span>
            <span class="error__text"
              v-if="!$v.dataSet.city.required && $v.dataSet.city.$dirty"
            >
              Укажите город
            </span>
          </div>

          <div class="group_home_street">
            <div class="group__input group__street">
              <label for="street" class='label'>Улица</label>
              <input type="text" id="street" 
                v-model.trim="dataSet.street"
                @blur="saveInLocalStorage()"
              />
            </div>

            <div class="group__input">
              <label for="home" class='label'>Дом</label>
              <input type="text" id="home" 
                v-model.trim="dataSet.home"
              />
            </div>
          </div>

          <div class="group__input">
            <label for="index" class='label label__index'>Индекс</label>
            <input type="text" id="index" 
              v-model.trim="dataSet.index"
              @blur="$v.dataSet.index.$touch(), saveInLocalStorage()"
              :class="{invalid:((!$v.dataSet.index.numeric && $v.dataSet.index.$dirty
                              || !$v.dataSet.index.maxLength && $v.dataSet.index.$dirty
                              || !$v.dataSet.index.minLength && $v.dataSet.index.$dirty
              ))}"
            />
            <span class="error__text"
              v-if="!$v.dataSet.index.numeric && $v.dataSet.index.$dirty"
            >
              Индекс должен состоять только из цифр
            </span>
            <span class="error__text"
              v-else-if=" (!$v.dataSet.index.maxLength && $v.dataSet.index.$dirty)
                  || (!$v.dataSet.index.minLength && $v.dataSet.index.$dirty)
              "
            >
              Индекс должен состоять из 6 цифр
            </span>
          </div>
          
          <div class="btn__wrap">
            <button @click.prevent="previousStep" class='btn__step'>Назад</button>
            <button @click.prevent="nextStep" class='btn__step'
              :class='{activ: ( 
                !this.$v.dataSet.coutry.$invalid &&
                !this.$v.dataSet.region.$invalid &&
                !this.$v.dataSet.index.$invalid &&
                !this.$v.dataSet.city.$invalid 
                
              )}'
            
            >Далее</button>
          </div>
        </div>
      </transition>

      <transition name="step">
        <div class="page_wrap"
          v-show="step === 4"
        >
          <h2 class="form__title">Документ</h2>

          <div class="wp__text">
            <div class="group__input">
              <label for="typeDocument" class='label'
                @click="isDropSelectDocument = !isDropSelectDocument"
              >Тип документа<span class="color_red">*</span></label>
              <label for="typeDocument" class='arrow_drop'
                :class="{drop:isDropSelectDocument}"
              ></label>
              <select name="typeDocument"
                id="typeDocument"
                v-model="dataSet.typeDocument"
                @click="isDropSelectDocument = !isDropSelectDocument"
                @blur="$v.dataSet.typeDocument.$touch(), saveInLocalStorage()"
                :class="{invalid:((!$v.dataSet.typeDocument.required && $v.dataSet.typeDocument.$dirty))}"
              >
                <option value="passport">Паспорт</option>
                <option value="license">Свидетельство о рождении</option>
                <option value="certificate">Вод. удостоверение</option>
              </select>
            </div>
            <span class="error__text"
              v-if="!$v.dataSet.typeDocument.required && $v.dataSet.typeDocument.$dirty"
            >
              Выберите тип документа
            </span>
          </div>


          <div class="group__input">
            <label for="issuedBy" class='label'>Кем выдан</label>
            <input type="text" id="issuedBy" 
              v-model.trim="dataSet.issuedBy"
              @blur="saveInLocalStorage()"
            />
          </div>

          <div class="wp__text">
            <div class="group__series_number">
              <div class="group__input">
                <label for="series" class='label'>Серия</label>
                <input type="text" id="series" 
                  v-model.trim="dataSet.seriesDoc"
                  @blur="saveInLocalStorage()"
                />
              </div>

              <div class="group__input">
                <label for="number" class='label'>Номер</label>
                <input type="text" id="number" 
                  v-model.trim="dataSet.numberDoc"
                  @blur="$v.dataSet.numberDoc.$touch(), saveInLocalStorage()"
                  :class="{invalid:((!$v.dataSet.numberDoc.numeric && $v.dataSet.numberDoc.$dirty))}"
                />
              </div>
            </div>
            <span class="error__text"
              v-if="!$v.dataSet.numberDoc.numeric && $v.dataSet.numberDoc.$dirty"
            >
              Номер долджен состоять только из цифр
            </span>
          </div>

          <div class="group__input">
            <label for="dateIssue" class='label'>Дата выдачи<span class="color_red">*</span></label>
            <input type="date" id="dateIssue" 
              v-model.trim="dataSet.dateDoc"
              @blur="$v.dataSet.dateDoc.$touch(), saveInLocalStorage()"
              :class="{invalid:((!$v.dataSet.dateDoc.required && $v.dataSet.dateDoc.$dirty))}"
            />
            <span class="error__text"
              v-if="!$v.dataSet.dateDoc.required && $v.dataSet.dateDoc.$dirty"
            >
              Укажите дату
            </span>
          </div>
          <div class="btn__wrap">
            <button @click.prevent="previousStep" class='btn__step'>Назад</button>
            <button type="submit" class='btn__step'
              :class='{activ: ( 
                !this.$v.dataSet.dateDoc.$invalid &&
                !this.$v.dataSet.numberDoc.$invalid &&
                !this.$v.dataSet.typeDocument.$invalid
             
                
              )}'
            >Создать</button>
          </div>
        </div>
      </transition>
    </form>
  </div>
</template>

<script>
import {helpers , required, minLength, maxLength, minValue, maxValue, numeric, decimal} from 'vuelidate/lib/validators';
//Валидатор для русского алфавита
const alpha = helpers.regex('alpha', /^[a-zA-Zа-яёА-ЯЁ]*$/)

export default {
  name: "Form",
  data: () => ({
    isShowTost: false,
    step: 1,
    isDropSelectGroup: false,
    isDropSelectDocument: false,
    isDropSelectDoctor: false,
    isMinValCheck: false,
    coutGroup: 0,
    setGroupClient:[{title:'VIP', activ:false},
                    {title:'Проблемные', activ:false}, 
                    {title:'ОМС', activ:false}],
    resetGroupClient:[{title:'VIP', activ:false},
                    {title:'Проблемные', activ:false}, 
                    {title:'ОМС', activ:false}],
    moveTopForm: 0,
    dataSet:{
      surname:'',
      name:'',
      middleName:'',
      DOB:'',
      numberPhone:'',
      coutry:'',
      region:'',
      city:'',
      street:'',
      home:'',
      index:'',
      issuedBy:'',
      seriesDoc:'',
      numberDoc:'',
      dateDoc:'',
      genderCheckM: false,
      genderCheckF: false,
      smsCheck: false,  
      selectGroupClient:[],
      doctor: '',
      typeDocument: '',
    },
    dataReset:{
      surname:'',
      name:'',
      middleName:'',
      DOB:'',
      numberPhone:'',
      coutry:'',
      region:'',
      city:'',
      street:'',
      home:'',
      index:'',
      issuedBy:'',
      seriesDoc:'',
      numberDoc:'',
      dateDoc:'',
      genderCheckM: false,
      genderCheckF: false,
      smsCheck: false,  
      selectGroupClient:[],
      doctor: '',
      typeDocument: '',
    },
    
  }),
  validations:{
    dataSet:{
      name:{
        required,
        alpha,
      },
      surname:{
        required,
        alpha,
      },
      middleName:{
        alpha,
      },
      DOB:{
        required,
      },
      numberPhone:{
        required,
        minValue:minValue(70000000000),
        maxValue:maxValue(79999999999),
        maxLength:maxLength(11),
        minLength:minLength(11),
        numeric,
      },
      coutry:{
        alpha,
      },
      region:{
        alpha,
      },
      city:{
        alpha,
        required,
      },
      index:{
        numeric,
        maxLength:maxLength(6),
        minLength:minLength(6),
      },
      typeDocument:{
        required,
      },
      numberDoc:{
        numeric,
      },
      dateDoc:{
        required,
      }
    },
    coutGroup:{
      minValue:minValue(1),
    }
  },
  methods:{
    saveInLocalStorage(){
      //Сохроняем данные в localStorage,
      //Чтобы не потерять их если что-то пойдёт не так
      localStorage.dataSet = JSON.stringify(this.dataSet)
      localStorage.coutGroup = JSON.stringify(this.coutGroup)
      localStorage.setGroupClient = JSON.stringify(this.setGroupClient)
    },
    addClientInGroup(ind){
      //
      this.setGroupClient[ind].activ = !this.setGroupClient[ind].activ

      if(this.setGroupClient[ind].activ) {
        this.dataSet.selectGroupClient.push( this.setGroupClient[ind].title)
        this.coutGroup++
      }else{
        let indItem = this.dataSet.selectGroupClient.indexOf(this.setGroupClient[ind].title)
        this.deleteClientInGroup(indItem)
      }

      
    },
    deleteClientInGroup(ind){
      this.coutGroup--
      let obj = this.setGroupClient.find(el => {
        if(el.title == this.dataSet.selectGroupClient[ind])
        return el
      })
      this.dataSet.selectGroupClient.splice(ind, 1)
      obj.activ = false
    },
    nextStep(){
      //Проверяем форму на промежуточную валидацию
      //И если не проходит, останавливаем функцию
      if(this.step == 1){
        if( this.$v.dataSet.name.$invalid ||
            this.$v.dataSet.surname.$invalid ||
            this.$v.dataSet.middleName.$invalid ||
            this.$v.dataSet.DOB.$invalid
        ){
          this.$v.dataSet.name.$touch()
          this.$v.dataSet.surname.$touch()
          this.$v.dataSet.middleName.$touch()
          this.$v.dataSet.DOB.$touch()
          return
        }
      }

      if(this.step == 2){
        if(
          this.$v.dataSet.numberPhone.$invalid ||
          this.$v.coutGroup.$invalid 

        ){
          this.isMinValCheck = true
          this.$v.dataSet.numberPhone.$touch()
          this.$v.coutGroup.$touch()
          return
        }
      }

      if(this.step == 3){
        if(
          this.$v.dataSet.coutry.$invalid ||
          this.$v.dataSet.region.$invalid ||
          this.$v.dataSet.index.$invalid ||
          this.$v.dataSet.city.$invalid
          
        ){
          this.$v.dataSet.coutry.$touch()
          this.$v.dataSet.region.$touch()
          this.$v.dataSet.city.$touch()
          this.$v.dataSet.index.$touch()
          return
        }
      }

      if(this.step+1 < 5) this.step++
     
    },  
    previousStep(){
      if( this.step-1 > 0 ) this.step-- 
    },
    showTost(){
      this.isMinValCheck = false
      setTimeout(()=>{this.isShowTost = false}, 1500)
    },
    resetDataForm(){
      //Очищаем localStorage
      localStorage.dataSet = ''
      localStorage.coutGroup = 0
      localStorage.setGroupClient = ''
      this.dataSet = {...this.dataReset}
      this.$v.$reset()
      this.step = 1
      this.isShowTost = true
      this.coutGroup = 0
      this.setGroupClient = this.resetGroupClient.map(el => el)
    },
    regSubmit(){
      //если не форма не проходит валидацию запускаем проверку и остонавлием функцию
      if(this.$v.$invalid){
        this.$v.$touch()
        return
      }

      //сбрасываем данные для создания нового пользователья
      this.resetDataForm()

      //Показываем сообщение о успешном создании
      this.showTost()

      //вместо для пуша на сервер)
      console.log(this.dataSet);
    },
    updateHeight(){
      //обновляем значения размера экрана, для позиционирования
      //при изменениях формы
      this.moveTopForm = (this.$refs.wrap.clientHeight/2)-250
      if(this.moveTopForm <= 7) this.moveTopForm = 7
    },
  },
  created(){
    window.addEventListener('resize', this.updateHeight);
  },
  mounted(){
    this.updateHeight()
    //Загружаем сохранные данные
    if(localStorage.dataSet) this.dataSet = JSON.parse(localStorage.dataSet)
    if(localStorage.coutGroup) this.coutGroup = JSON.parse(localStorage.coutGroup)
    if(localStorage.setGroupClient) this.setGroupClient = JSON.parse(localStorage.setGroupClient)
       
  }
};
</script>

<style scoped lang="scss">
.step-enter, .step-enter-to{
  transition: all .3s ease;
  opacity: 0;
  position: relative;
  top: 0;
  left: 0px;

}
.step-enter-to{
  opacity: 1;
}

.toast-enter ,.toast-leave-to{
  transform: translateY(-100%);
  transition: all .3s ease;
  opacity: 0;
}
.toast-enter-to, .toast-leave{
  transform: translateY(0);
  transition: all .3s ease;
  opacity: 1;
}


.toast__mesage{
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
  left:calc(70% - 100px);
  top: calc(25% - 30px);
  width: 200px;
  height: 60px;
  border: 5px solid rgba(46, 46, 46, 0.76);
  background-color: rgba(71, 71, 71, 0.74);
  border-radius: 10px;
  color: #eeeded;
  font-size: 22px;
  font-weight: bold;
}

select{
  position: relative;
  appearance: none;
  background-color: rgba(255, 255, 255, 0);
  z-index: 2;

  &::after{
    content: '';
    display: block;
    right: 0;
    top: 0;
    height: 30px;
    width: 30px;
  }
}

.span__prompt{
  padding: 0 15px 0 15px;
  margin-top: 25px;
  font-size: 12px;
  vertical-align: bottom;
  color: rgb(97, 97, 97);
  height: 0;
  line-height: 0;
}
select:not(:-internal-list-box) {
    overflow: hidden;
}
.step-leave, .step-leave-to{
  transition: all .3s ease;
  position: absolute;
  width: 400px;
  top: 0;
  left: 0;
  opacity: 0;
}


.option_lable{
  position: absolute;
}
.wrap {
  height: 100%;
  width: 100%;
  min-width: 400px;
  display: flex;
  justify-content: center;
}
.form {
  position: relative;
  height: max-content;
  width: 400px;
  display: flex;
  flex-direction: column;
  background-color: #f8f8f8;
  border-radius: 15px;
  box-shadow: 0 0 500px rgba(255, 255, 255, 0.5), 
              0 1px 2px rgba(0, 0, 0, 0.3), 
              0px 0px 0px 10px rgba(0, 0, 0, 0.10);
  overflow: hidden;
}
.page_wrap {
  display: flex;
  flex-direction: column;
  background-color: #f8f8f8;
  border-radius: 15px;
}
.form__title{
  width: 100%;
  line-height: 55px;
  font-size: 27px;
  font-family: 'Arial';
  font-weight: bold;
  color: #3c3c3c;
  background-color: rgba(0, 0, 0, 0.07);
  text-align: center;
  border-bottom: 3px solid rgba(109, 109, 109, 0.15);
  border-radius: 13px 13px 0 0;
}
.group__input{
  position: relative;
  display: flex;
  flex-direction: column;
  
  padding: 0 15px 0 15px;
  margin-top: 20px;

  & input,select{
    margin-top: 5px;
    padding-left: 7px;
    border: 1px solid rgb(187, 182, 182);
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.12),
                0px 0px 0px 3px rgb(228, 227, 227);
    height: 30px;
    font-size: 18px;
    color: #3c3c3c;
    border-radius: 5px;
    outline: none;
    width: 100%;
    
    &:hover{
       border-color: #a6cfdd;
       box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.12),
                  0px 0px 0px 3px rgb(225, 244, 255);
    } 

    &:focus{
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.12),
                  0px 0px 0px 3px rgb(193, 229, 250);
      border-color: #7dc9e2

    }

    &.invalid{
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.12),
                  0px 0px 0px 3px rgb(255, 156, 156);
      border-color: #f04545      
    }
  }
}

.error__text{
  margin-top: 3px;
  color: rgb(202, 16, 16);
  font-size: 14px;
}
.prompt__text{
  margin-top: 3px;
  font-size: 14px;
  color: rgb(95, 95, 95);
}
.wp__text .error__text{
  padding-left: 15px;
}

.select_client{
  margin-top: 10px;
}
.client_group{
  display: flex;
  flex-wrap: wrap;
  margin-right: -10px;
}
.client_group_item{
  display: flex;
  align-items: center;
  padding: 5px;
  margin-right: 10px;
  margin-top: 6px;
  background-color: rgb(236, 234, 234);
  border-radius: 5px;
  border: 2px solid rgb(202, 201, 201);

}
.delete__client_group_item{
  height: 22px;
  width: 22px;
  position: relative;
  border-radius: 50%;
  border: 2px solid rgb(150, 62, 62);

  margin-left: 4px;
  &::before, &::after{
    content: '';
    display: block;
    position: absolute;
    top: 8px;
    left: 2px;
    width: 14px;
    height: 2px;
    background-color: rgb(150, 62, 62);
  }

  &::before{
    transform: rotate(45deg);
  }

  &::after{
    transform: rotate(-45deg);
  }
}
.drom_select_group{
  position: absolute; 
  bottom: 0;
  right: 16px;
  height: 0px;
  width: calc(100% - 32px);

}

.arrow_drop{
  position: absolute; 
  bottom: 0;
  right: 0;
  right: 16px;
  height: 0px;
  width: calc(100% - 32px);
  z-index: 1;

  &::before{
    content: '';
    display: block;
    position: absolute;
    height: 28px;
    width: 28px;
    background-color: rgb(230, 227, 227);
    right: -1px;
    bottom: 0;
    border-radius: 0 5px 5px 0;
    border: 1px solid #aaa;
  }

  &::after{
    content: '';
    display: block;
    position: absolute;
    top: -23px;
    right: 7px;
    z-index: 3;
    height: 10px;
    width: 10px;
    border-bottom: 4px solid #333;
    border-right: 4px solid #333;
    transform: rotate(45deg);
    transition: .3s;
  }

  &.drop::after{
    transform: rotate(-135deg);
    top: -19px;
  }


}
.list__clien_group{
  z-index: 5;
  display: flex;
  position: relative;
  width: 100%;
  height: min-content;
  top: 100%;
  left: 0;
  flex-direction: column;
  border: 1px solid #999;
  background-color: rgb(255, 255, 255);
  transform: scaleY(0);
  transform-origin: 0px 0px;
  opacity: 0;
  transition: .4s;
  &.drop{
    transform: scaleY(1);
    opacity: 1;
  }
}
.item__clien_group{
  display: block;
  padding: 5px;

  &.activ{
    background-color: rgb(218, 218, 218);
  }

  &:hover{
    background-color: rgb(236, 234, 234);
  }


}
.label__index{
  width: 110px;
}
.label__client_item{
  width: 100%;
  height: 100%;
}
.group__DOB_gender{
  display: flex;
}
.gender__input{
  flex-direction: row;
}
.group_home_street, .group__series_number{
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
}
.group__input_sms{
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.label{
  display: block;
  font-family: "Arial";
  font-weight: bold;
  font-size: 16px;
  height: 20px;
  color: #3c3c3c;
}
.wrap_gender_input{
  display: flex;
  border-radius: 5px;
  margin-top: 5px;
  overflow: hidden;
 // box-shadow: 0px 0px 0px 3px rgb(228, 227, 227);
}
.label__gender{
  display: flex;
  height: 30px;
  width: 92px;
  background-color: #bbb;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  transition: all .3s;
  box-shadow: 15px 15px 15px -10px rgba(124, 124, 124, 0.6) inset;

  &:first-child{

  }

  &:last-child{
    border-left: 1px solid rgb(160, 160, 160);
    box-shadow: 1px 15px 15px -10px rgba(124, 124, 124, 0.6) inset;
  }

  &.activ{
    background-color: rgb(94, 177, 255);
    box-shadow: 1px 15px 15px -10px rgba(255, 255, 255, 0.6) inset;
  }
}
#DOB, #dateIssue{
  width: 155px;
  appearance: none;
}
#home{
  width: 110px;
}
#index{
  width: 110px;
}
#genderF,#genderM{
  position: absolute;
  left: -1000000px;
}
#sms{
  position: absolute;
  left: -1000000px;
}
#gr{
  position: relative;
  padding-right: 35px;

  &::after{
    content: "";
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    height: 30px;
    width: 30px;
  }
}
.group__street{
  flex-grow: 1;
  
}
.chekbox_sms{
  position: relative;
  height: 24px;
  width: 50px;
  margin-left: 20px;
  box-shadow: 0px 0px 0px 3px rgb(228, 227, 227);
  border-radius: 15px;
  overflow: hidden;

  &::after{
    display: block;
    position: absolute;
    content: "";
    height: 10px;
    width: 10px;
    background-color: rgb(95, 95, 95);
    border-radius: 50%;
    border: 8px solid #999;
    left:25px;
    top:-1px;
    transition: .4s;
  }
  &::before{
    display: block;
    content: "";
    position: absolute;
    width: 200%;
    height: 24px;
    left: -12px;
    background: linear-gradient(90deg, rgba(177,23,23,1) 50%, rgba(17,201,0,1) 50%); 
    transition: .4s;
  }

  &.activ{
    &::after{
      left: 0px;
    }

    &::before{
      left: -38px;
    }
  }
}

.icon_chek_delet{
  position: relative;
  background: linear-gradient(90deg, rgb(255, 0, 0) 50%, rgb(21, 255, 0) 50%); 
  width: 100%;
  height: 100%;
  left: 0;
  mask-image:  url(/delete.svg), url(/check.svg);
  mask-size: 16px 16px, 18px 18px;
	mask-repeat: no-repeat;
  mask-position: 8px 5px, 56px 4px;
  transition: .4s;

  &.activ{
    mask-position: -15px 5px, 27px 4px;
  }
}
.btn__wrap{
  display: flex;
  margin-top: 20px;
  width: 100%;
  height: 40px;
  border-top: 1px solid rgba(109, 109, 109, 0.329);
}
.btn__step{
  flex-grow:1;
  background-color: rgb(224, 224, 224);
  font-size: 18px;
  font-weight: normal;
  color:#3c3c3c;
  border-left: 1px solid;
  transition: all .3s;

  &:first-child{
   
    border-left: none;
  }

  &:last-child{
     
    
    border-color: #9eb9c2;
    color: rgb(187, 184, 184);
  }

  &.activ{
    background-color: #2853c9;
    text-shadow: 2px 2px 5px rgb(0, 23, 124);
    box-shadow: -10px -10px 44px -20px rgba(0, 64, 112, 1) inset;
    color: rgb(230, 227, 227); 
  }
}
.color_red{
  display: inline-block;
  color: rgb(185, 7, 7);
  padding-left: 0;
  font-size: 16px;
  line-height: 1px;
  font-weight: 1000;
  height: 20px;
  text-align: center;
}
</style>
