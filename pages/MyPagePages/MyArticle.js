import React, {useEffect, useState, useRef} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Touchable, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {firebase_db} from '../../firebaseConfig';
import { StatusBar } from 'expo-status-bar';
import {MakeNewBook} from './MakeNewBook';
import { ReloadInstructions } from 'react-native/Libraries/NewAppScreen';
//import defaultExport from '@react-native-firebase/auth';



const MyArticle = ({navigation, route, reload}) => {
    const {chapters, chapterTitle} = route.params;
    const {bookKey, chapterKey} = route.params;
    const [data, setData] = useState([]);
    const [likeNumber, setLikeNumber] = useState(0);
    // console.log(chapterKey)

    function renderArticle(){
        return(
            <View>
            <View>
                <Text style={styles.bookTitle}>{chapterTitle}</Text>  
            </View>
            <ScrollView style={styles.textContainer}>
                <Text style={styles.bookText}>{chapters.mainText}</Text>  
                <Text style={styles.regdate}>{chapters.regdate}</Text>
            </ScrollView>
            </View>
        )
    }

    // const showAlert = () =>
    //     Alert.alert(
    //         "Alert Title",
    //         "My Alert Msg",
    //         [
    //         {
    //             text: "Cancel",
    //             onPress: () => Alert.alert("Cancel Pressed"),
    //             style: "cancel",
    //         },
    //         ],
    //         {
    //         cancelable: true,
    //         onDismiss: () =>
    //             Alert.alert(
    //             "This alert was dismissed by tapping outside of the alert dialog."
    //             ),
    //         }
    //     );


    function delArticle(){
        // console.log("챕터 삭제")
        
        firebase_db
        .ref(`book/${bookKey}/chapters/` + chapters.chapterKey)
        .set(null)
        .then(function(){
            Alert.alert("챕터 삭제")
        })

    }

    // useEffect(()=>{
    //     let likeNumber = 0;
    //     Like.map((el) => {
    //         if (el.responseTo === comment._id) {
    //             likeNumber++;
    //         }
    //         setLikeNumber(likeNumber);
    //     }, [Likes]);
    // })
    {/* 
                    const [childCommentNumber, setchildCommentNumber] = useState(0);
                    useEffect(() => {
                                let commentNumber = 0;
                                //  댓글 전체 리스트를 가져온 후 각 댓글의 responseTo가 현제 렌더하는 comment의 _id와 일치하는 갯수
                                Comments.map((el) => {
                                if (el.responseTo === comment._id) {
                                    commentNumber++;
                                }
                                });
                                setchildCommentNumber(commentNumber);
                            }, [Comments]); */}

    return (

        <View style={styles.container}>
            <StatusBar style="white" />

            <View style={styles.upperButtonContainer}>
                <TouchableOpacity style={styles.editButton}>                
                    <Text style={styles.editButtonText}>편집</Text>
                </TouchableOpacity>  

                <TouchableOpacity style={styles.deleteButton} >
                    <Text style={styles.deleteButtonText} onPress={()=>delArticle()}>삭제</Text>
                </TouchableOpacity>  
            </View>

            <View>
                {renderArticle()}
            </View>
            
            <View style={styles.bottomButtonContainer}>

                <TouchableOpacity style={styles.likeButton}>                
                    <Text style={styles.likeButtonText}>공감</Text>
{/* 
                    const [childCommentNumber, setchildCommentNumber] = useState(0);
                    useEffect(() => {
                                let commentNumber = 0;
                                //  댓글 전체 리스트를 가져온 후 각 댓글의 responseTo가 현제 렌더하는 comment의 _id와 일치하는 갯수
                                Comments.map((el) => {
                                if (el.responseTo === comment._id) {
                                    commentNumber++;
                                }
                                });
                                setchildCommentNumber(commentNumber);
                            }, [Comments]); */}
                </TouchableOpacity>  

                <TouchableOpacity style={styles.commentButton}>
                    <Text style={styles.commentButtonText}>댓글</Text>
                </TouchableOpacity>  
            </View>
        </View>
    )}


const styles = StyleSheet.create({ 

    container: {
        //앱의 배경 색
        backgroundColor:"#F5F4F4",
                flex:1
      },

      upperButtonContainer: {
        flex:1,
        flexDirection:"row",
        alignSelf:"flex-end",
        marginTop: "15%",
        marginRight:"10%"


      },

      editButton: {
          
      },
      deleteButton: {
          marginLeft: "7%"
      },

      textContainer:{
          height: "50%"
      },

      bookTitle:{
        fontSize: 20,
        marginLeft: "5%"

      },
      bookText:{
          marginTop: "20%",
          marginLeft:"10%",
          marginRight:"10%",

      },
      
      regdate: {
          marginLeft : "10%"
      },

      bottomButtonContainer: {
        flex:1,
        flexDirection:"row",
        marginTop: "15%",
        marginRight:"10%"

      },
    
      commentButton: {
        marginLeft: "7%"
    },
    
    likeButton: {
        marginLeft: "10%"

    }

})

export default MyArticle;