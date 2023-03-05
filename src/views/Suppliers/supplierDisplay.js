import React, {Component} from 'react';
import Card from '../../components/card';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  KeyboardAvoidingView,
  Touchable,
  BackHandler,
  RefreshControl,
  TextInput,
  Pressable,
} from 'react-native';
import {globalStyles} from '../../utils/styles';

export function SupplierDisplay({route}) {
  // console.log(route.params.data.pro_desc)
  const {data} = route.params;
//   console.log(data.pro_desc);


//   return (
//     <>
//       {loading ? <Loader /> : null}
//       <AppHeaders title={editable?'Edit Product':'View Product'} color={'#fff'}>
//         <View>
//           <Pressable onPress={()=>{
//             setEditable(true)
//           }}>
//             {
//               !editable?
//               <Entypo name='edit' size={20} color='#000' />:null
//             }
//           </Pressable>
//         </View>
//       </AppHeaders>
//       <KeyboardAvoidingView style={globalStyles.screenLayout}> 
//         <SafeAreaView>
//           <ScrollView>
//             <View>
//               <View style={styles.inputBox}>
//                 <Input
//                   mode={'outlined'}
//                   label={'Pro-id'}
//                   value={productData.pro_id}
//                   onChangeText={value =>
//                     onInputChange(productInputKey.pro_id, value)
//                   }
//                   error={error.pro_id}
//                   outlineStyle={error.pro_id && styles.inputError}
//                   placeholder={'PRO_ID'}
//                   disabled={true}
//                 />
//               </View>
//               <View style={styles.inputBox}>
//                 <Input
//                   mode={'outlined'}
//                   label={'Pro-num'}
//                   keyboardType={'phone-pad'}
//                   value={productData.pro_num}
//                   onChangeText={value =>
//                     onInputChange(productInputKey.pro_num, value)
//                   }
//                   error={error.pro_num}
//                   outlineStyle={error.pro_num && styles.inputError}
//                   placeholder={'PRO_NUM'}
//                   disabled={true}
//                 />
//               </View>
//               <View style={styles.inputBox}>
//                 <Input
//                   mode={'outlined'}
//                   label={'Pro-desc'}
//                   value={productData.pro_desc}
//                   onChangeText={value =>
//                     onInputChange(productInputKey.pro_desc, value)
//                   }
//                   error={error.pro_desc}
//                   outlineStyle={error.pro_desc && styles.inputError}
//                   placeholder={'PRO_DESC'}
//                   multiline={true}
//                   numberOfLines={4}
//                   disabled={!editable}
//                 />
//               </View>
//               <View style={styles.inputBox}>
//                 <Input
//                   mode={'outlined'}
//                   label={'Pro-items'}
//                   value={productData.pro_items}
//                   onChangeText={value =>
//                     onInputChange(productInputKey.pro_items, value)
//                   }
//                   error={error.pro_items}
//                   outlineStyle={error.pro_items && styles.inputError}
//                   placeholder={'PRO_items'}
//                   disabled={!editable}
//                 />
//               </View>
//               <View style={styles.inputBox}>
//                 <Input
//                   mode={'outlined'}
//                   label={'Pro-type'}
//                   value={productData.pro_type}
//                   onChangeText={value =>
//                     onInputChange(productInputKey.pro_type, value)
//                   }
//                   error={error.pro_type}
//                   outlineStyle={error.pro_type && styles.inputError}
//                   placeholder={'PRO_type'}
//                   disabled={true}
//                 />
//               </View>
//             </View>
//             {
//               editable?<View style={styles.bottomContainer}>
//               <View style={styles.cnclBtn}>
//                 <Pressable onPress={() => {setEditable(false)}}>
//                   <Text style={styles.btnText}>Cancel</Text>
//                 </Pressable>
//               </View>
//               <View style={styles.subBtn}>
//                 <Pressable onPress={onSubmit}>
//                   <Text style={[styles.btnText, {color: '#fff'}]}>Submit</Text>
//                 </Pressable>
//               </View>
//             </View>:null
//             }
            
//           </ScrollView>
//         </SafeAreaView>
//       </KeyboardAvoidingView>
//     </>
//   );
// }


return(
<><View
        style={{
          padding: 25,
          alignItems: 'center',
          margin: 10,
          marginTop: 70,
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: 'black',
            marginBottom: 20,
          }}>
          Sales Details
        </Text>
        <Card>
          <View
            style={{
              padding: 40,
              alignItems:'center'
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
              Supplier ID
            </Text>
            <Text style={globalStyles.text}>{data.sup_id}</Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black',
                marginTop: 15,
              }}>
              Supplier Name
            </Text>
            <Text style={globalStyles.text}>{data.sup_name}</Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black',
                marginTop: 15,
              }}>
              Supplier Email
            </Text>
            <Text style={globalStyles.text}>{data.sup_email}</Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black',
                marginTop: 15,
              }}>
              Supplier Username
            </Text>
            <Text style={globalStyles.text}>{data.sup_username}</Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black',
                marginTop: 15,
              }}>
              Mobile Number
            </Text>
            <Text style={globalStyles.text}>{data.sup_mobile}</Text>
            
          </View>
        </Card>
      </View>
    </>
);
            }