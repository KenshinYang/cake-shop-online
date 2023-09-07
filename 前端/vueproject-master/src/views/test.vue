<template>
    <div>
        <el-row :gutter="10" justify=center>
            <el-col v-for="(item,index) in listData" :key="index" :span="12">
                <el-card>
                    <el-image
                     :src="require('@/assets/'+item.description)"></el-image> 
                    <div style="padding: 14px;">
                        <span v-text="item.name" style="font-size: 20px"></span>
                        <div class="bottom clearfix">
                            <p style= "background-color: pink;" class="description" v-text="item.description"></p>
                            <p class="price">{{item.price}}元</p>
                            <p></p>
                            <el-button type="text" class="button">点击下单</el-button>
                        </div>
                    </div> 
                </el-card>
            </el-col> 
        </el-row>
    </div>
</template>

<script>
export default {
    data(){
        return{
            listData:[]
        }
    },
    created(){

        this.listData=this.getData()
    },
    methods:{
        getData:function(){
            let data=[
                {
                    name:"苹果",
                    price:200,
                    description:"test.jpg"
                },{
                    name:"苹果",
                    price:200,
                    description:"test.jpg"
                }
            ]
            return data;
        }
    }
}
</script>