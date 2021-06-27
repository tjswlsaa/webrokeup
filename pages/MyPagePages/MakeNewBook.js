
import React, {useEffect,useState,useRef} from 'react';
import {ImageBackground, StyleSheet, Button,Text, View, Image, Alert, TouchableOpacity, ScrollView, TouchableHighlight, TextInput, Route} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/Ionicons';
import {firebase_db} from '../../firebaseConfig';
import firebase from 'firebase/app'
import Constants from 'expo-constants'
import {NavigationContainer} from '@react-navigation/native';
//import { add, Value } from 'react-native-reanimated';
import { OPENSSL_VERSION_NUMBER } from 'constants';
import * as ImagePicker from 'expo-image-picker';


const book ="https://postfiles.pstatic.net/MjAyMTA2MDdfMTk0/MDAxNjIzMDY3OTkzMTYz.Uyg7r1zEBbPKA-CfVHU0R5ojbmozb02GJzMRapgcP1cg.flIv0UKSYHpE_CHNSOi2huGzv3svilsmEmMFy1G9zH0g.PNG.asj0611/book.png?type=w773"
const bookBackground = "https://postfiles.pstatic.net/MjAyMTA2MDdfMTE1/MDAxNjIzMDY2NDQwOTUx.N4v5uCLTMbsT_2K1wPR0sBPZRX3AoDXjBCUKFKkiC0gg.BXjLzL7CoF2W39CT8NaYTRvMCD2feaVCy_2EWOTkMZsg.PNG.asj0611/bookBackground.png?type=w773"



const MakeNewBook = ({navigation,route}) => {

    
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
 

  const user_id = Constants.installationId;
  const bookTitle_a = useRef(null);
  const [text1,setText1] = useState('');
  const [data,setData] = useState(''); 
  const [chapters, setChapters] = useState('');
  const [intro, setIntro] = useState('');
  
  const [image, setImage] = useState(null);


  const saveBook = async() => {
    //let ref = firebase_db.database().reference().child("lol")
    //var key = ref.childByAutoId().key
    var bookKey = Math.random().toString().replace(".","");
    //generate-id();
    
    var bookTitle = text1;

    firebase_db
    .ref('book/'+bookKey)
    .set({
      bookTitle: bookTitle,
      user_id: user_id,
      chapters: chapters,
      intro: intro,
      regdate: new Date().toString(),
      image:image
    })

    Alert.alert("생성 완료")
    navigation.navigate("IntroArticle", {bookKey: bookKey})  
  }


  useEffect(()=>{
    console.log("hello")

    var changeDataRef = firebase.database().ref('book/').orderByChild("regdate");
    changeDataRef.on("value",(snapshot) =>{
      console.log(snapshot)
      const bookKey=snapshot.bookKey;
      const tmp = [];

      snapshot.forEach((child)=>{

        tmp.unshift({
          bookKey:child.bookKey,
          user_id:child.val().user_id,
          bookTitle:child.val().bookTitle,
          chapters:child.val().chapters,
          intro:child.val().intro,
          regdate: child.val().regdate,
          image: child.val().image
        })
      })

      console.log(tmp);
      setData(tmp);
    })

  },[])


  return ( 
 <View style={styles.container}>
    <ImageBackground style={styles.bookBackgroundImage} source={{uri:bookBackground}} >

      <View style={styles.openButtonContainer}>
          <TouchableOpacity style={styles.openButton} onPress={()=>saveBook()}>
            <Text style={styles.openButtonText}>저장</Text>
        </TouchableOpacity>

      </View>

      <View style={styles.bookContainer}>

      <ImageBackground style={styles.bookImage} source={{uri:book}} >

  
      <View style={styles.bookContainer}>
        <View style={styles.titleInput}>
            <TextInput style={styles.titleInputText} multiline={true} 
            returnKeyType="done"
            onChangeText={text1=> setText1(text1)}
            ref={bookTitle_a}
            placeholder="두 줄 제목"/>
            <View style={{borderBottomColor: "#d3d3d3" ,borderBottomWidth: "1%", width:"60%",marginLeft:"8%", marginBottom:"3%" }}/>
            <Text style={styles.titleInputText}> </Text>
            <View style={{borderBottomColor: "#d3d3d3" ,borderBottomWidth: "1%", width:"60%",marginLeft:"8%", }}/>
        </View>
        <View>
            <Text style={styles.writer}> 이별록 지은이 </Text>
        </View>
        <TouchableOpacity style={styles.photoInputContainer}>
            <Icon name="add" size={30} color="black" style={styles.addIcon}/>
            <Text style={styles.photoInputText}>이별집 표지 이미지를 넣어주세요</Text>
            <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </TouchableOpacity>
      </View>

    </ImageBackground>
    </View>
    </ImageBackground>
</View>


  )}

  const styles = StyleSheet.create({ 
    container:{
        flex:1,
        flexDirection: "column"
    },
    bookContainer:{
      marginTop:"11%",
      marginRight:"6%",
      marginLeft:"6%",

      height:"92%",
    },

    bookBackgroundImage:{
      height:"100%",
        resizeMode: "cover",
        

    },
    bookImage:{
      height:"100%",
      resizeMode: "cover",

    },
    openButtonContainer:{
      height: "8%",
      width:"100%",
      justifyContent:"flex-end",
      alignItems:"flex-end",
      
  },
  openButton:{
      height:"40%",
      width:"22.67%",
      backgroundColor:"#c4c4c4",
      borderRadius:5,
      marginRight:"6%" ,
      justifyContent:"center",

  
  },
  openButtonText:{
      marginLeft:"15%",
      fontSize:14,

  },
  titleInput: {
    height:"12%",
    width: "50%"
  },
  titleInputText:{
    fontSize: 20,
    marginLeft: "10%",
    flexShrink: 1,
  },

  writer:{

    alignSelf: "flex-end",
    marginRight:"5%",
    marginTop:"5%"

  },
  photoInputContainer:{
    marginTop:"17%",
    height:"50%",
    width:"85%",
    marginLeft:"5%",
    alignSelf:"center",
    justifyContent: "center",
    alignItems: "center"


  }




  })


  export default MakeNewBook;