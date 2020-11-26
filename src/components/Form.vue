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
                  @click="dataSet.genderCheckM = true, dataSet.genderCheckF = false"
                  :class="{activ:dataSet.genderCheckM}"
                >Мужчина</label> 
                <input type="radio" id="genderM" name='gender' />
                <input type="radio" id="genderF" name='gender' />
                <label for="genderF" class='label__gender female'
                  @click="dataSet.genderCheckM = false, dataSet.genderCheckF = true"
                  :class="{activ:dataSet.genderCheckF}"
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

          <div class="group__input"
            ref='groupClient'
            @click="setInputFocus"
          >
            <label for="gr" class='label'>Группа клиентов*</label>
            <div class="client_group">
              <div class="client_group_item"
                v-for="(val, ind) of dataSet.selectGroupClient" :key='ind'
              > 
                {{val}}
                <a class="delete__client_group_item"
                  @click.prevent='deleteClientInGroup(ind)'
                ></a>
              </div>
            </div>
            <input type="text" id="gr" 
              @click.self="isDropSelectGroup = !isDropSelectGroup"
              
            />
            <div
              class='drom_select_group'
              :class='{drop:isDropSelectGroup}'  
            >
              <ul class='list__clien_group'
                :class='{drop:isDropSelectGroup}'
              > 
                <li 
                  class='item__clien_group'
                  v-for="(val, ind) of setGroupClient" :key='ind'
                  :value='val'  
                  :id='val' 
                  :class='{activ:val.activ}'
                  @click.prevent="addClientInGroup(ind)"
                  
                >
                  <label for='gr'>{{val}}</label>
                </li>
              </ul>
            </div>
          </div>

          <div class="group__input">
            <label for="doctor" class='label'>Лечащий врач</label>
            <select name="doctor"
              v-model='dataSet.doctor'
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
              @click='dataSet.smsCheck =!dataSet.smsCheck'
            >Не отправлять СМС</label>
            <label for="sms" class='chekbox_sms'
              @click='dataSet.smsCheck =!dataSet.smsCheck'
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
              <input type="text" id="home" />
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
              v-model="dataSet.typeDocument"
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
    focused: false,
    step: 1,
    isDropSelectGroup: false,
    setGroupClient:[{title:'VIP', activ:false},
                    {title:'Проблемные', activ:false}, 
                    {title:'ОМС', activ:false}],
    dataSet:{
      genderCheckM: false,
      genderCheckF: false,
      smsCheck: false,  
      selectGroupClient:[],
      doctor: '',
      clientGroup:'',
      typeDocument: '',
    },
  }),
  methods:{

    addClientInGroup(ind){
      this.setInputFocus()
      this.setGroupClient[ind].activ = !this.setGroupClient[ind].activ

      if(this.setGroupClient[ind].activ) {
        this.dataSet.selectGroupClient.push( this.setGroupClient[ind].title)
      }else{
        let indItem = this.dataSet.selectGroupClient.indexOf(this.setGroupClient[ind].title)
        this.deleteClientInGroup(indItem)
      }
    },
    deleteClientInGroup(ind){
      let obj = this.setGroupClient.find(el => {
        if(el.title == this.dataSet.selectGroupClient[ind])
        return el
      })
      this.dataSet.selectGroupClient.splice(ind, 1)
      obj.activ = false
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
    },
    setInputFocus(){
      console.log(1);
      this.$refs.groupClient.focus();
    },
  },
  mounted(){
    //this.$refs.textInput.focus()
  }
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
  }
}
.select_client{
  margin-top: 10px;
}
.client_group{
  display: flex;
  flex-wrap: wrap;
  margin-right: -10px;
  
  //justify-content: space-between;
}
.client_group_item{
  display: flex;
  padding: 5px;
  margin-right: 10px;
  margin-top: 6px;
  background-color: rgb(212, 212, 212);
  border-radius: 5px;
  border: 2px solid rgb(202, 201, 201);

}
.delete__client_group_item{
  height: 20px;
  width: 10px;
  background-color: red;
}
.drom_select_group{
  position: absolute; 
  bottom: 0;
  right: 16px;
  height: 0px;
  width: calc(100% - 32px);


  &::before{
    content: '';
    display: block;
    position: absolute;
    height: 28px;
    width: 28px;
    background-color: #aaa;
    //border-radius: 50%;
    right: 0;
    bottom: 1px;
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
  background-color: #ddd;
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
    background-color: #888;
  }

  &:hover{
    background-color: rgb(194, 194, 194);
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
