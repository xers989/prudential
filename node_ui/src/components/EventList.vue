<template>
  <v-data-table
    class="pl-10 pr-10"
    :headers="headers"
    :items="eventList"
    :search="search"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>고객 이벤트 관리 </v-toolbar-title>
        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" max-width="500px">
          

          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
            
                <v-row>
                  <v-col>
                    <v-subheader>고객정보</v-subheader>
                  </v-col>
                  <v-col  sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.customer_no"
                      label="통합고객번호"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                  <v-col  sm="5" md="5">
                    <v-text-field
                      v-model="editedItem.customer_name"
                      label="고객명"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col >
                    <v-subheader>접촉정보</v-subheader>
                  </v-col>
                  <v-col  sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.contact_type"
                      label="고객접촉정보"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                  <v-col  sm="5" md="5">
                    <v-text-field
                      v-model="editedItem.occur_date"
                      label="발생일자"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <div v-if="editedItem.contact_type == '디지털로그정보'">
                <v-row>
                   <v-col cols="5">
                    <v-text-field
                      v-model="editedItem.channel"
                      label="디지털채널구분"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                   <v-col cols="10">
                    <v-text-field
                      v-model="editedItem.access_start_date"
                      label="채널접촉시작일자"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                   <v-col cols="10">
                    <v-text-field
                      v-model="editedItem.access_end_date"
                      label="채널접촉종료일자"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row> 
                  <v-col cols="15">
                    <v-text-field
                      v-model="editedItem.contact_page_id"
                      label="접속페이지ID"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                </v-row>
                </div>

                <div v-else-if="editedItem.contact_type == '상담접촉정보'">
               <v-row>
                   <v-col cols="5">
                    <v-text-field
                      v-model="editedItem.channel"
                      label="상담채널구분"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                   <v-col cols="10">
                    <v-text-field
                      v-model="editedItem.consult_relate_no"
                      label="상담접촉연관번호"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                   <v-col cols="10">
                    <v-text-field
                      v-model="editedItem.consult_start_date"
                      label="상담접촉시작일시"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                   <v-col cols="10">
                    <v-text-field
                      v-model="editedItem.consult_end_date"
                      label="상담접촉종료일시"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row> 
                  <v-col cols="10">
                    <v-text-field
                      v-model="editedItem.consult_result"
                      label="상담접촉결과"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row> 
                  <v-col cols="10">
                    <v-text-field
                      v-model="editedItem.consult_user_id"
                      label="담당자ID"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                </v-row>
                </div>



                <!--items: ['전체','디지털로그정보', '상담접촉정보', '안내장발송정보', '민원정보','실시간이벤트정보','고객정보제공통지'],-->

                 <div v-else-if="editedItem.contact_type == '안내장발송정보'">
               <v-row>
                   <v-col cols="5">
                    <v-text-field
                      v-model="editedItem.channel"
                      label="발송채널"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                   <v-col cols="10">
                    <v-text-field
                      v-model="editedItem.inform_type"
                      label="안내유형"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                   <v-col cols="10">
                    <v-text-field
                      v-model="editedItem.business_code"
                      label="업무구분"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                   <v-col cols="10">
                    <v-text-field
                      v-model="editedItem.business_transaction_no"
                      label="업무거래번호"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                   <v-col cols="10">
                    <v-text-field
                      v-model="editedItem.inform_date"
                      label="발송일자"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row> 
                  <v-col cols="10">
                    <v-text-field
                      v-model="editedItem.inform_result"
                      label="발송결과"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row> 
                  <v-col cols="10">
                    <v-text-field
                      v-model="editedItem.letter_type"
                      label="안내장형태"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                </v-row>
                </div>


                <!--items: ['전체','디지털로그정보', '상담접촉정보', '안내장발송정보', '민원정보','실시간이벤트정보','고객정보제공통지'],-->

                 <div v-else-if="editedItem.contact_type == '민원정보'">
               <v-row>
                   <v-col cols="5">
                    <v-text-field
                      v-model="editedItem.channel"
                      label="민원접수채널"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                   <v-col cols="10">
                    <v-text-field
                      v-model="editedItem.complaint_type"
                      label="민원유형"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                </v-row>
                </div>


 <!--items: ['전체','디지털로그정보', '상담접촉정보', '안내장발송정보', '민원정보','실시간이벤트정보','고객정보제공통지'],-->

                 <div v-else-if="editedItem.contact_type == '실시간이벤트정보'">
               <v-row>
                   <v-col cols="5">
                    <v-text-field
                      v-model="editedItem.channel"
                      label="접촉채널"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                   <v-col cols="10">
                    <v-text-field
                      v-model="editedItem.contact_date"
                      label="접촉일시"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                   <v-col cols="15">
                    <v-text-field
                      v-model="editedItem.contact_page_id"
                      label="접촉페이지ID"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                   <v-col cols="10">
                    <v-text-field
                      v-model="editedItem.contact_respnding"
                      label="접촉대응여부"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                </v-row>
                </div>



                <!--items: ['전체','디지털로그정보', '상담접촉정보', '안내장발송정보', '민원정보','실시간이벤트정보','고객정보제공통지'],-->

                 <div v-else-if="editedItem.contact_type == '고객정보제공통지'">
               <v-row>
                   <v-col cols="5">
                    <v-text-field
                      v-model="editedItem.channel"
                      label="통지채널"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                   <v-col cols="10">
                    <v-text-field
                      v-model="editedItem.notice_type"
                      label="통지유형"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                   <v-col cols="10">
                    <v-text-field
                      v-model="editedItem.notice_date"
                      label="통지일자"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                   <v-col cols="10">
                    <v-text-field
                      v-model="editedItem.notice_form"
                      label="통지형태"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                   <v-col cols="10">
                    <v-text-field
                      v-model="editedItem.provide_org"
                      label="제공기관"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                </v-row>
                </div>


                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">취소 </v-btn>
              <v-btn color="blue darken-1" text @click="save"> 저장 </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>


        <v-dialog v-model="dialogNew" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
<v-row>
                   <v-col cols="5">
                    <v-text-field
                      v-model="editedItem.channel"
                      label="민원접수채널"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                   <v-col cols="10">
                    <v-text-field
                      v-model="editedItem.complaint_type"
                      label="민원유형"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          
           <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">취소 </v-btn>
              <v-btn v-if="editMode" color="blue darken-1" text @click="save"> 저장 </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <v-container fluid>
          


        <v-row no-gutters>
            <v-col cols="4">
              <v-text-field
                  v-model="frdate"
                  hint="이벤트 검색 시작 일자를 입력 하세요"
                  label="이벤트 검색 시작 일자">
              </v-text-field>
            </v-col>

            <v-col cols="2">
            </v-col>
            
        </v-row>

         <v-row no-gutters>
          <v-col cols="2">
              <v-text-field
                  v-model="search_customer_no"
                  counter="5"
                  hint="통합 고객 번호를 입력하세요"
                  label="통합고객번호">
              </v-text-field>
          </v-col>
          <v-col>
            </v-col>
          <v-col cols="3">
                <v-select
                v-model="contactType"
                :items="items"
                label="고객 접촉 종류 선택"
                outlined
                ></v-select>
            </v-col>
          <v-col>
              <v-btn
              class="ma-2"
              outlined
              color="indigo"
              @click="search">
            검색
              </v-btn>
          </v-col>
        </v-row>

        <v-spacer></v-spacer>
      
      </v-container>
    </template>
    
    <template v-slot:item.contact_type="{ item }">
      <v-chip @click="detailItem(item)" :color="getColor(item.contact_type)" dark>
        {{ item.contact_type }}
      </v-chip>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="detailItem(item)"> mdi-pencil </v-icon>
    </template>
  </v-data-table>
</template>


<script>
export default {
  name: "EventInfoList",
  data() {
    return {
      editMode: false,
      dialog: false,
      dialogDelete: false,
      frdate: "2022-01-01",
      search_customer_no: "",
      contactType: "전체",
      headers: [
        { text: "고객접촉정보", value: "contact_type" },
        { text: "통합고객번호", value: "customer_no" },
        { text: "고객이름", value: "customer_name" },
        { text: "발생일자", value: "occur_date" },
        { text: "채널", value: "channel" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      eventList: [],
      editedIndex: -1,
      editedItem: {},
      defaultItem: {},
      statistics: {},
      items: ['전체','디지털로그정보', '상담접촉정보', '안내장발송정보', '민원정보','실시간이벤트정보','고객정보제공통지'],
      }
  },
  created() {
    console.log("created");
    //this.listUserInfo();
  },
  computed: {
    formTitle() {
      return (this.editedIndex === -1 && this.editMode) ? "New Contact" : (this.editedIndex > -1 && this.editMode) ? "Edit Contact" : "Detail Contact";
    },
    isReadonly() {
      return this.editMode ? false : true;
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  methods: {
    getColor (eventType) {
        if (eventType == '디지털로그정보') return 'red'
        else if (eventType == '상담접촉정보') return 'orange'
        else if (eventType == '안내장발송정보') return 'blue'
        else if (eventType == '민원정보') return 'green'
        else if (eventType == '실시간이벤트정보') return 'grey'
        else return 'pink'
      },
    listEventInfo() {
      console.log("start");
      let eventList = [];
      let getURI = "/contact/";


  

      if (this.search_customer_no !="")
        getURI = getURI+this.search_customer_no+"/"

      if (this.contactType =="디지털로그정보")
            getURI = getURI+"D/"
        else if (this.contactType == '상담접촉정보') getURI = getURI+"E/"
        else if (this.contactType == '안내장발송정보') getURI = getURI+"F/"
        else if (this.contactType == '민원정보') getURI = getURI+"A/"
        else if (this.contactType == '실시간이벤트정보') getURI = getURI+"B/"
        else if (this.contactType == '고객정보제공통지') getURI = getURI+"C/"
        

      console.log("Start Date"+this.frdata);  
      if (this.frdata!="")
        getURI = getURI + "?frdate="+this.frdate;

console.log("getURI"+getURI);      
      this.$axios
        .get(getURI)
        .then((result) => {
          const res_data = result.data;
          console.log("eventData GET:"+ JSON.stringify(res_data));
          
          for (let i = 0; i < res_data.length; i++) {
            
            let eventData = {};
            eventData["contact_type"]  = res_data[i].contact_information.contact_type;
            eventData["customer_no"]         = res_data[i].u_customer_no;
            eventData["customer_name"]          = res_data[i].customer_name;
            eventData["occur_date"]         = res_data[i].contact_information.occur_date;
            
            if (res_data[i].contact_information.contact_type == '디지털로그정보') {
                eventData["channel"]          = res_data[i].contact_information.digital_channel_type;
                eventData["access_start_date"]          = res_data[i].contact_information.access_start_date;
                eventData["access_end_date"]          = res_data[i].contact_information.access_end_date;
                eventData["contact_page_id"]          = res_data[i].contact_information.contact_page_id;
            }
            else if (res_data[i].contact_information.contact_type == '상담접촉정보') {
                eventData["channel"]          = res_data[i].contact_information.consult_channel_type;
                eventData["consult_relate_no"]          = res_data[i].contact_information.consult_relate_no;
                eventData["consult_start_date"]          = res_data[i].contact_information.consult_start_date;
                eventData["consult_end_date"]          = res_data[i].contact_information.consult_end_date;
                eventData["consult_result"]          = res_data[i].contact_information.consult_result;
                eventData["consult_user_id"]          = res_data[i].contact_information.consult_user_id;
            }

            else if (res_data[i].contact_information.contact_type == '안내장발송정보') 
            {
                eventData["channel"]          = res_data[i].contact_information.inform_channel;
                eventData["business_code"]          = res_data[i].contact_information.business_code;
                eventData["business_transaction_no"]          = res_data[i].contact_information.business_transaction_no;
                eventData["inform_date"]          = res_data[i].contact_information.inform_date;
                eventData["inform_result"]          = res_data[i].contact_information.inform_result;
                eventData["letter_type"]          = res_data[i].contact_information.letter_type;
                eventData["inform_type"]          = res_data[i].contact_information.inform_type;
            }

            else if (res_data[i].contact_information.contact_type == '민원정보')
            {
                eventData["channel"]          = res_data[i].contact_information.complaint_channel;
                eventData["complaint_type"]          = res_data[i].contact_information.complaint_type;

            }
            else if (res_data[i].contact_information.contact_type == '실시간이벤트정보')
            {
                eventData["channel"]          = res_data[i].contact_information.contact_channel;
                eventData["contact_date"]          = res_data[i].contact_information.contact_date;
                eventData["complaint_type"]          = res_data[i].contact_information.complaint_type;
                eventData["contact_page_id"]          = res_data[i].contact_information.contact_page_id;
                eventData["contact_respnding"]          = res_data[i].contact_information.contact_respnding;
            }
            else {
                eventData["channel"]          = res_data[i].contact_information.notice_channel;
                eventData["notice_date"]          = res_data[i].contact_information.notice_date;
                eventData["notice_type"]          = res_data[i].contact_information.notice_type;
                eventData["notice_form"]          = res_data[i].contact_information.notice_form;
                eventData["provide_org"]          = res_data[i].contact_information.provide_org;
            }

            eventList.push(eventData);
            console.log("eventData GET:"+ JSON.stringify(eventData));
               
          }
          this.eventList = eventList;
          console.log("userList : "+JSON.stringify(eventList));
        });
    },
    detailItem(item) {
      this.editMode = false;
      this.editedIndex = this.eventList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    editItem(item) {
      this.editMode = true;
      this.editedIndex = this.eventList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogNew = true;
    },

    deleteItem(item) {
      this.editedIndex = this.eventList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.eventList.splice(this.editedIndex, 1);

      console.log(this.editedItem);
      /*
      this.$axios
          .delete("/customer/"+this.search_customer_no+"/history?manage_type="+this.editedItem.customer_manage_type)
          .then((result) => {
            console.log(result);
            this.listUserInfo();
          });
          */
      this.closeDelete();
    },
    search() {
      this.listEventInfo();
        //console.log("Gogogogo Search"+ this.search_customer_no);
    },

    close() {
      console.log("Close");
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      
      let jsonBody = {};
            
            if (this.editedItem.contact_type == '디지털로그정보') {
                jsonBody["u_customer_no"] = this.editedItem.customer_no;
                jsonBody["customer_name"] = this.editedItem.customer_name;
                let jsonContact = {};
                jsonContact["contact_type"]=this.editedItem.contact_type;
                jsonContact["occur_date"]=this.editedItem.occur_date;
                jsonContact["digital_channel_type"]=this.editedItem.channel;
                jsonContact["access_start_date"]=this.editedItem.access_start_date;
                jsonContact["access_end_date"]=this.editedItem.access_end_date;
                jsonContact["contact_page_id"]=this.editedItem.contact_page_id;

                jsonBody["contact_information"] = jsonContact;

            }
            else if (this.editedItem.contact_type  == '상담접촉정보') {
                console.log("상담첩총정보");
                jsonBody["u_customer_no"] = this.editedItem.customer_no;
                jsonBody["customer_name"] = this.editedItem.customer_name;
                let jsonContact = {};
                jsonContact["contact_type"]=this.editedItem.contact_type;
                jsonContact["occur_date"]=this.editedItem.occur_date;
                jsonContact["consult_channel_type"]=this.editedItem.channel;
                jsonContact["consult_start_date"]=this.editedItem.consult_start_date;
                jsonContact["consult_end_date"]=this.editedItem.consult_end_date;
                jsonContact["consult_result"]=this.editedItem.consult_result;
                jsonContact["consult_user_id"]=this.editedItem.consult_user_id;
                jsonContact["consult_relate_no"]=this.editedItem.consult_relate_no;

                jsonBody["contact_information"] = jsonContact;


            }

            else if (this.editedItem.contact_type  == '안내장발송정보') 
            {
                jsonBody["u_customer_no"] = this.editedItem.customer_no;
                jsonBody["customer_name"] = this.editedItem.customer_name;
                let jsonContact = {};
                jsonContact["contact_type"]=this.editedItem.contact_type;
                jsonContact["occur_date"]=this.editedItem.occur_date;
                jsonContact["business_code"]=this.editedItem.business_code;
                jsonContact["business_transaction_no"]=this.editedItem.business_transaction_no;
                jsonContact["inform_date"]=this.editedItem.inform_date;
                jsonContact["inform_channel"]=this.editedItem.channel;
                jsonContact["inform_result"]=this.editedItem.inform_result;
                jsonContact["letter_type"]=this.editedItem.letter_type;
                jsonContact["inform_type"]=this.editedItem.inform_type;

                jsonBody["contact_information"] = jsonContact;


            }

            else if (this.editedItem.contact_type  == '민원정보')
            {
                jsonBody["u_customer_no"] = this.editedItem.customer_no;
                jsonBody["customer_name"] = this.editedItem.customer_name;
                let jsonContact = {};
                jsonContact["contact_type"]=this.editedItem.contact_type;
                jsonContact["occur_date"]=this.editedItem.occur_date;
                jsonContact["complaint_type"]=this.editedItem.complaint_type;
                jsonContact["complaint_channel"]=this.editedItem.channel;

                jsonBody["contact_information"] = jsonContact;


            }
            else if (this.editedItem.contact_type  == '실시간이벤트정보')
            {
                jsonBody["u_customer_no"] = this.editedItem.customer_no;
                jsonBody["customer_name"] = this.editedItem.customer_name;
                let jsonContact = {};
                jsonContact["contact_type"]=this.editedItem.contact_type;
                jsonContact["occur_date"]=this.editedItem.occur_date;
                jsonContact["contact_date"]=this.editedItem.contact_date;
                jsonContact["complaint_type"]=this.editedItem.complaint_type;
                jsonContact["contact_channel"]=this.editedItem.channel;
                jsonContact["contact_page_id"]=this.editedItem.contact_page_id;
                jsonContact["contact_respnding"]=this.editedItem.contact_respnding;

                jsonBody["contact_information"] = jsonContact;


            }
            else {
                jsonBody["u_customer_no"] = this.editedItem.customer_no;
                jsonBody["customer_name"] = this.editedItem.customer_name;
                let jsonContact = {};
                jsonContact["contact_type"]=this.editedItem.contact_type;
                jsonContact["occur_date"]=this.editedItem.occur_date;
                jsonContact["notice_date"]=this.editedItem.notice_date;
                jsonContact["notice_type"]=this.editedItem.notice_type;
                jsonContact["notice_channel"]=this.editedItem.channel;
                jsonContact["notice_form"]=this.editedItem.notice_form;
                jsonContact["provide_org"]=this.editedItem.provide_org;

                jsonBody["contact_information"] = jsonContact;


            }

            console.log("Bucket Post : "+JSON.stringify(jsonBody));

            this.$axios
          .post("/contact/", jsonBody)
          .then((result) => {
            console.log("ELSE:"+result);
            this.listEventInfo();
            //this.shipList.push(this.editedItem);
          });



/*
      if (this.editedIndex > -1) {
        this.$axios
          .patch("/customer/"+this.search_customer_no+"/history/?manage_type="+this.editedItem.customer_manage_type, jsonBody)
          .then((result) => {
            console.log("IF:"+result);
            //Object.assign(this.shipList[this.editedIndex], this.editedItem);
            this.listUserInfo();


          });
      } else {
        this.$axios
          .post("/customer/"+this.search_customer_no+"/history/", jsonBody)
          .then((result) => {
            console.log("ELSE:"+result);
            this.listUserInfo();
            //this.shipList.push(this.editedItem);
          });
      }
      */
      this.close();
    },
  },
};
</script>