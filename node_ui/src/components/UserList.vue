<template>
  <v-data-table
    class="pl-10 pr-10"
    :headers="headers"
    :items="userList"
    :search="search"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>고객 이력 사항 관리</v-toolbar-title>
        <v-divider class="mx-4" insert vertical></v-divider>
        <p>통합고객번호</p> <v-spacer></v-spacer> <h3>{{uCustomerNo}}</h3>
        <v-spacer></v-spacer>
      <p>고객 이름</p><h3>{{customerName}}</h3>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="통합고객번호"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            
            <v-btn color="blue-grey" v-bind="attrs" v-on="on">
              <span style="color: white">신규</span>
            </v-btn>
            
          </template>

          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="15" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.customer_manage_type"
                      label="고객정보관리유형"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="15" sm="5" md="5">
                    <v-text-field
                      v-model="editedItem.manage_target"
                      label="관리대상정보"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="15" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.manage_event"
                      label="정보관리이벤트"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="15" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.event_channel"
                      label="이벤트발생채널"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                </v-row>
              
                <v-row>
                  <v-col cols="15" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.process_date"
                      label="처리일자"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="15" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.process_owner"
                      label="처리담당자"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    
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
    </template>



    <template v-slot:item.customer_manage_type="{ item }">
      <v-chip @click="detailItem(item)" :color="getColor(item.customer_manage_type)" dark>
        {{ item.customer_manage_type }}
      </v-chip>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>


<script>
export default {
  name: "UserInfoList",
  data() {
    return {
      search: "",
      editMode: false,
      dialog: false,
      dialogDelete: false,
      uCustomerNo: "",
      customerName : "",
      headers: [
        { text: "고객정보관리유형", value: "customer_manage_type" },
        { text: "관리대상정보", value: "manage_target" },
        { text: "정보관리이벤트", value: "manage_event" },
        { text: "이벤트발생채널", value: "event_channel" },
        { text: "처리일자", value: "process_date" },
        { text: "처리담당자", value: "process_owner" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      userList: [],
      editedIndex: -1,
      editedItem: {},
      defaultItem: {},
      statistics: {},
      }
  },
  created() {
    console.log("created");
    this.listUserInfo();
  },
  computed: {
    formTitle() {
      return (this.editedIndex === -1 && this.editMode) ? "New History" : (this.editedIndex > -1 && this.editMode) ? "Edit History" : "Detail History";
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
    getColor (calories) {
        if (calories == 'A') return 'red'
        else if (calories == 'B') return 'orange'
        else return 'green'
      },
    listUserInfo() {
      console.log("start");
      let userList = [];
      console.log("listUserInfo");

      this.$axios
        .get("/customer/1/history/")
        .then((result) => {
          const res_data = result.data;
          console.log("userData GET:"+ JSON.stringify(res_data));
          this.uCustomerNo = res_data[0].u_customer_no;
          this.customerName = res_data[0].customer_name;

          for (let i = 0; i < res_data.length; i++) {
              for (let j = 0; j < res_data[i].customer_manage_history.length; j++) {
                const history = res_data[i].customer_manage_history[j];
                let userData = {};
                console.log("RES Item : "+JSON.stringify(history));
                userData["customer_manage_type"]  = history.customer_manage_type;
                userData["manage_target"]         = history.manage_target;
                userData["manage_event"]          = history.manage_event;
                userData["event_channel"]         = history.event_channel;
                userData["process_date"]          = history.process_date;
                userData["process_owner"]         = history.process_owner;
                userList.push(userData);
                console.log("userData GET:"+ JSON.stringify(userData));
              }
          }
          this.userList = userList;
          console.log("userList : "+JSON.stringify(userList));
        });
    },
    detailItem(item) {
      this.editMode = false;
      this.editedIndex = this.userList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    editItem(item) {
      this.editMode = true;
      this.editedIndex = this.userList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.userList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.userList.splice(this.editedIndex, 1);

      console.log(this.editedItem);
      this.$axios
          .delete("/customer/1/history?manage_type="+this.editedItem.customer_manage_type)
          .then((result) => {
            console.log(result);
            this.listUserInfo();
          });
      this.closeDelete();
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

      jsonBody["customer_manage_type"]  = this.editedItem.customer_manage_type;
      jsonBody["manage_target"]         = this.editedItem.manage_target;
      jsonBody["manage_event"]          = this.editedItem.manage_event;
      jsonBody["event_channel"]         = this.editedItem.event_channel;
      jsonBody["process_date"]          = this.editedItem.process_date;
      jsonBody["process_owner"]         = this.editedItem.process_owner;


      if (this.editedIndex > -1) {
        this.$axios
          .patch("/customer/1/history/?manage_type="+this.editedItem.customer_manage_type, jsonBody)
          .then((result) => {
            console.log("IF:"+result);
            //Object.assign(this.shipList[this.editedIndex], this.editedItem);
            this.listUserInfo();


          });
      } else {
        this.$axios
          .post("/customer/1/history/", jsonBody)
          .then((result) => {
            console.log("ELSE:"+result);
            this.listUserInfo();
            //this.shipList.push(this.editedItem);
          });
      }
      this.close();
    },
  },
};
</script>