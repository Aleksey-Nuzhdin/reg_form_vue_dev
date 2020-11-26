<template>
  <div class="wrap">
    <form class="form" novalidate
      @submit.prevent="regSubmit"
    >
      <transition name="step">
        <div class="page_wrap" 
          v-show="step === 1"
        >
          <h2 class="form__title">Создание клиента</h2>

          <div class="group__input">
            <label for="surname" class='label'>Фамилия*</label>
            <input type="text" id="surname" />
          </div>

          <div class="group__input">
            <label for="name" class='label'>Имя*</label>
            <input type="text" id="name" />
          </div>

          <div class="group__input">
            <label for="middleName" class='label'>Отчество</label>
            <input type="text" id="middleName" />
          </div>

          <div class="group__DOB_gender">
            <div class="group__input">
              <label for="DOB" class='label'>Дата рождения*</label>
              <input type="date" id="DOB" />
            </div>
            <div class="group__input">
              <label for="gender" class='label'>Пол</label>
              <div class="wrap_gender_input">
                <label for="genderM" class='label__gender male'
                  @click="genderCheckM = true, genderCheckF = false"
                  :class="{activ:genderCheckM}"
                >Мужчина</label> 
                <input type="radio" id="genderM" name='gender' />
                <input type="radio" id="genderF" name='gender' />
                <label for="genderF" class='label__gender female'
                  @click="genderCheckM = false, genderCheckF = true"
                  :class="{activ:genderCheckF}"
                >Женщина</label>
              </div>
            </div>
          </div>

          <div class="btn__wrap">
            <button @click.prevent="nextStep" class='btn__step'>Далее</button>
          </div>
        </div>
      </transition>
      <transition name="step">
        <div class="page_wrap" 
          v-show="step === 2"
        >
          <h2 class="form__title">Даные</h2>

          <!--
          <div class="group__input">
            <label class="label">Группа клиентов*</label>
            <div class="group__input">
              <label for="VIP" class='label'>VIP</label>
              <input type="checkbox" id="VIP" />
            </div>

            <div class="group__input">
              <label for="hard" class='label'>Проблемные</label>
              <input type="checkbox" id="hard" />
            </div>

            <div class="group__input">
              <label for="OMC" class='label'>ОМС</label>
              <input type="checkbox" id="OMC" />
            </div>
          </div>
          -->

          <div class="group__input">
            <label for="gr" class='label'>Группа клиентов*</label>
            <div class="client_group">
              <div class="client_group_item"
                v-for="(val, ind) of selectGroupClient" :key='ind'
              > 
                {{val}}
              </div>
            </div>
            <select name="select_client_group"
              v-model='clientGroup'
            >
              <option 
                v-for="(val, ind) of setGroupClient" :key='ind'
                :value='val'  
                :id='val' 
                @click.prevent="addClientGroup(ind)"
              >
                {{val}}
              </option>
            </select>
          </div>

          <div class="group__input">
            <label for="doctor" class='label'>Лечащий врач</label>
            <select name="doctor"
              v-model='doctor'
            >
              <option value="Иванов">Иванов</option>
              <option value="Захаров">Захаров</option>
              <option value="Чернышева">Чернышева</option>
            </select>
          </div>
      
          <div class="group__input">
            <label for="numberPhone" class='label'>Номер телефона</label>
            <input type="tel" id="numberPhone" />
          </div>
          
          <div class="group__input group__input_sms">
            <label for="sms" class='label'
              @click='smsCheck =!smsCheck'
            >Не отправлять СМС</label>
            <label for="sms" class='chekbox_sms'
              @click='smsCheck =!smsCheck'
              :class='{activ:smsCheck}'
            ></label>
            
            <input type="checkbox" id="sms" name="sms" />
          </div>

          <div class="btn__wrap">
            <button @click.prevent="previousStep" class='btn__step'>Назад</button>
            <button @click.prevent="nextStep" class='btn__step'>Далее</button>
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
            <input type="text" id="coutry" />
          </div>

          <div class="group__input">
            <label for="region" class='label'>Область</label>
            <input type="text" id="region" />
          </div>

          <div class="group__input">
            <label for="city" class='label'>Город*</label>
            <input type="text" id="city" />
          </div>

          <div class="group_home_street">
            <div class="group__input group__street">
              <label for="street" class='label'>Улица</label>
              <input type="text" id="street" />
            </div>

            <div class="group__input">
              <label for="home" class='label'>Дом</label>
              <input type="number" id="home" />
            </div>
          </div>

          <div class="group__input">
            <label for="index" class='label'>Индекс</label>
            <input type="number" id="index" />
          </div>
          
          <div class="btn__wrap">
            <button @click.prevent="previousStep" class='btn__step'>Назад</button>
            <button @click.prevent="nextStep" class='btn__step'>Далее</button>
          </div>
        </div>
      </transition>

      <transition name="step">
        <div class="page_wrap"
          v-show="step === 4"
        >
          <h2 class="form__title">Документ</h2>

          <div class="group__input">
            <label for="typeDocument" class='label'>Тип документа*</label>
            <select name="typeDocument"
              v-model="typeDocument"
            >
              <option value="passport">Паспорт</option>
              <option value="license">Свидетельство о рождении</option>
              <option value="certificate">Вод. удостоверение</option>
            </select>
          </div>

          <div class="group__input">
            <label for="issuedBy" class='label'>Кем выдан</label>
            <input type="text" id="issuedBy" />
          </div>

          <div class="group__series_number">
            <div class="group__input">
              <label for="series" class='label'>Серия</label>
              <input type="text" id="series" />
            </div>

            <div class="group__input">
              <label for="number" class='label'>Номер</label>
              <input type="text" id="number" />
            </div>
          </div>

          <div class="group__input">
            <label for="dateIssue" class='label'>Дата выдачи</label>
            <input type="date" id="dateIssue" />
          </div>
          <div class="btn__wrap">
            <button @click.prevent="previousStep" class='btn__step'>Назад</button>
            <button type="submit" class='btn__step'>Создать</button>
          </div>
        </div>
      </transition>
    </form>
  </div>
</template>

<script>
export default {
  name: "Form",
  data: () => ({
    step: 1,
    genderCheckM: false,
    genderCheckF: false,
    smsCheck: false,
    setGroupClient:['VIP', 'Проблемные', 'ОМС'],
    selectGroupClient:[],
    doctor: '',
    clientGroup:'',
    typeDocument: '',
  }),
  methods:{
    addClientGroup(ind){
      this.selectGroupClient.push( this.setGroupClient[ind])
      this.setGroupClient.splice(ind, 1)
    },
    nextStep(){
      if(this.step+1 < 5) this.step++
     
    },  
    previousStep(){
      if( this.step-1 < 1 ) this.step = 1
      else this.step-- 
      
    },
    create(){
      console.log('успех');
    },
    regSubmit(){
      console.log('submit');
    }
  },
};
</script>

<style scoped lang="scss">
.step-enter{
  transition: all .3s ease;
  opacity: 0;
  position: relative;
  top: 0;
  left: 0px;

}
.step-enter-to{
  transition: all .3s ease;
  opacity: 1;
  position: relative;
  top: 0;
  left: 0;
}

.step-leave{
  transition: all .3s ease;
  position: absolute;
  width: 400px;
  top: 0;
  left: 0;
  opacity: 0;
}

.step-leave-to{
  transition: all .3s ease;
  position: absolute;
  width: 400px;
  top: 0;
  left: 0px;
  opacity: 0;
}

.option_lable{
  position: absolute;
}
.wrap {
  height: 100%;
  width: 100%;
  
  display: flex;
  justify-content: center;
}
.form {
  position: relative;
  margin-top: 20%;
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
  }
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
  width: 102px;
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
  width: 135px;
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
  text-shadow: 0 1px #e3f1f1;
  font-size: 18px;
  font-weight: normal;
  color:#3c3c3c;
  border-left: 1px solid;

  &:first-child{
    border-bottom-left-radius: 13px;
    border-left: none;
  }

  &:last-child{
    border-bottom-right-radius: 13px; 
    
    border-color: #9eb9c2;
  }
}
</style>
