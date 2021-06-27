import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import { StatusBar } from 'expo-status-bar';
const MyChapterItem = (props) => {
    const {navigation, chapters, chapterTitle, myitem} = props;
    return (
        <View>
            <TouchableOpacity style={styles.bookIndexOne} onPress={()=>{navigation.navigate('MyArticle', {myitem: myitem, chapters:chapters, navigation:navigation, chapterTitle:chapterTitle})}}>
                <Text style={styles.bookIndexOneTitle}>{chapters.chapterTitle}</Text>  
                <Text style={styles.bookIndexOnePunchLine}>{chapters.mainText}</Text>
                <Text style={styles.bookIndexText}>{chapters.regdate}</Text>
            </TouchableOpacity>
            <View style={{borderBottomColor: "gray" ,borderBottomWidth: 1,}}/>
        </View>
    )
}
const MyBook = ({navigation, route}) =>{
    const {myitem} = route.params;
    const intro = Object.values(myitem.intro)
    const chapters = Object.values(myitem.chapters)
    console.log(intro)
    const renderMyChapter = () => {
        console.log("renderMyChapter실행중")
        console.log(chapters)
        const isMyitem = (typeof myitem !== 'undefined');
            if (isMyitem == false) {
                return null; 
            }
        const isChapters = (myitem.chapters > ''); 
            if (isChapters == false) {
                return null; 
            }
            // console.log(myitem.chapters)
        const subChapters = Object.values(chapters)
        console.log(subChapters)
        return(
            subChapters.map(chapters=>{
                return(
                    <MyChapterItem
                        navigation = {navigation}
                        chapters = {chapters}
                        chapterTitle = {chapters.chapterTitle}
                        myitem = {myitem}
                    />
                )
            })
        )
    }
    return (
            <ScrollView style={styles.container}>
                <View  style={styles.bookCoverContainer}>
                    <StatusBar style="white" />
                    <Image style={styles.bookCoverImage} source={{uri:myitem.image}}></Image>
                </View>
                <View  style={styles.bookInfoContainer}>
                    <Text style={styles.bookTitle}>{myitem.bookTitle}</Text>  
                    <Text style={styles.bookDesc}>{intro}</Text>  
                    <TouchableOpacity style={styles.subButton}>        
                        <Text style={styles.subButtonText}>구독하기</Text>
                    </TouchableOpacity>   
                </View>
                <View style={styles.bookIndexContainer}>
                    {renderMyChapter()}
                </View>
                <TouchableOpacity style = {{alignSelf: "center", padding: 20, paddingHorizontal: 150,backgroundColor: "#FE8D6F"}}
                    onPress = {()=>navigation.navigate("NewPage", {myitem:myitem, chapters:chapters})}>
                    <Text style = {{fontWeight:"600"}}>새로운 챕터 만들기</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
const styles = StyleSheet.create({
    container: {
        backgroundColor:"#F5F4F4",
                flex:1
        },    
    bookCoverContainer: {
        width:'90%',
        height:220,
        marginTop:"%",
        alignSelf:"center"
    },
    bookCoverImage: {
        marginTop:"7%",
        height:"100%",
        width: "40%",
        alignSelf:"center"
    },
    bookInfoContainer: {
        backgroundColor:"#F5F4F4",
        width:'90%',
        height:130,
        alignSelf:"center"
    },
    bookTitle: {
        fontSize: 15,
        marginTop: "7%",
        marginLeft:"5%",
        fontSize: 15,  
    },
    bookDesc: {
        marginTop: "4%",
        marginLeft:"5%",
    },
    subButton:{
        width:"50%",
            height:27,
            padding:"2%",
            backgroundColor:"#FE8D6F",
            borderRadius:15,
            margin:"2%",
            marginLeft: "0%",
            marginTop: "5%",
            alignSelf:"center",    
    },
    subButtonText: {
        color:"white",
        fontWeight:"200",
        //텍스트의 현재 위치에서의 정렬 
        textAlign:"center"
    },
    bookIndexContainer:{
        backgroundColor: '#fff',
    },
    bookIndexOne: {
        marginTop:"5%",
        marginLeft:"5%",
        marginRight:"3%",
        marginBottom:"5%"
    },
    bookIndexOneTitle: {
        fontSize: 15,
    },
    bookIndexOnePunchLine:{
        fontWeight: '700',
        marginLeft:"5%",
        marginTop:"2%",
    },
    bookIndexText :{
        marginLeft:"5%",
        marginTop:"2%",
    },
})
export default MyBook;