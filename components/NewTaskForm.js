import { Text, View, TextInput, StyleSheet, ScrollView, Platform } from "react-native";
import { useForm, Controller } from "react-hook-form";
import FirstButton from "./FirstButton";
import { useState, useCallback, useRef, useContext } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// import API_KEY from "../util/mapKey";
import PhoneInput from "react-native-phone-input";
import countriesList from "../data/countriesList";
import { AuthContext } from "../store/authContext";
const API_KEY= 'AIzaSyBV4WxDD9DNEcaz72U5Wpf7lg9gTiyPKhI';
function NewTaskForm(props) {
  const authCtx = useContext(AuthContext);
  const uid = authCtx.respondData.localId;
  const name = authCtx.respondData.displayName;

  let currentTime = new Date();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taskTitle: "",
      price: "",
      taskType: "",
      estHour: "",
      phone: "",
      address: "",
      description: "",
      date: currentTime,
      isCompleted: false,
      status: "Posted",
      uid: uid,
      name: name,
    },
  });

  const onSubmitHandler = (data) => {
    props.onSubmit(data);
  };
  const [typeOpen, setTypeOpen] = useState(false);
  const [typeValue, setTypeValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Handyman", value: "Handyman" },
    { label: "Delivery", value: "Delivery" },
    { label: "Moving Service", value: "Moving Service" },
    { label: "IT Service", value: "IT Service" },
    { label: "Personal Assistant", value: "Personal Assistant" },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Task Title</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            maxLength={40}
          />
        )}
        name="taskTitle"
      />
      {errors.taskTitle && <Text style={styles.error}>This is required.</Text>}
      <Text style={styles.label}>Task Price CAD</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="numeric"
          />
        )}
        name="price"
      />
      {errors.price && <Text style={styles.error}>This is required.</Text>}
      <Text style={styles.label}>Estimated Hour(s)</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="numeric"
          />
        )}
        name="estHour"
      />

      <Text style={styles.label}>Phone Number</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.input}>
            <PhoneInput
              autoFormat={true}
              // onPressFlag={this.onPressFlag}
              countriesList={countriesList}
              initialCountry={"ca"}
              initialValue=""
              value={value}
              onChangePhoneNumber={onChange}
            />
          </View>
        )}
        name="phone"
      />

      {errors.phone && <Text style={styles.error}>This is required.</Text>}

      <Text style={styles.label}>Task Type</Text>
      <Controller
        name="taskType"
        rules={{
          required: true,
        }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.dropdownContainer}>
            <DropDownPicker
              listMode="SCROLLVIEW"
              style={styles.dropdown}
              open={typeOpen}
              value={typeValue} //companyValue
              items={items}
              setOpen={setTypeOpen}
              setValue={setTypeValue}
              setItems={setItems}
              placeholder="Select Type"
              placeholderStyle={styles.placeholderStyles}
              // onOpen={onCompanyOpen}
              onChangeValue={onChange}
            />
          </View>
        )}
      />
      {errors.taskType && <Text style={styles.error}>This is required.</Text>}

      <Text style={styles.label}>Task Address</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <ScrollView
            horizontal
            contentContainerStyle={{ flex: 1, width: "100%" }}
            keyboardShouldPersistTaps="handled"
            style={styles.address}
          >
            <GooglePlacesAutocomplete
              listViewDisplayed={false}
              enablePoweredByContainer={false}
              value={value}
              placeholder=""
              onPress={(data, details = null) => {
                onChange(data.description);
              }}
              query={{
                key: API_KEY,
                language: "en",
                components: "country:ca",
              }}
            />
          </ScrollView>
        )}
        name="address"
      />

      {errors.address && <Text style={styles.error}>This is required.</Text>}

      <Text style={styles.label}>Description</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.multiline}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            multiline
          />
        )}
        name="description"
      />
      <Text style={styles.invisible}>

        * Phone number and address are invisible until helper is approved.
      </Text>

      <View style={styles.buttonBox}>
        <FirstButton
          style={styles.submit}
          buttonText={styles.submitText}
          onPress={handleSubmit(onSubmitHandler)}
        >
          Submit
        </FirstButton>
        <FirstButton
          onPress={props.onClick}
          style={styles.cancel}
          buttonText={styles.cancelText}
        >
          Cancel
        </FirstButton>
      </View>
    </View>
  );
}

export default NewTaskForm;

const styles = StyleSheet.create({
  container: {},
  input: {
    marginHorizontal: 30,
    padding: 8,
    paddingVertical: 12,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#008c8c",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 1,
    elevation: 1,
  },

  address: {
    marginHorizontal: 30,

    paddingVertical: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#008c8c",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 1,
    elevation: 1,
  },
  multiline: {
    padding: 8,
    textAlignVertical: "top",
    height: 150,
    marginHorizontal: 30,
    paddingVertical: 12,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#008c8c",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 1,
    elevation: 1,
  },
  dropdownContainer: {
    marginHorizontal: 30,
    zIndex: 1000,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#008c8c",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 1,
    elevation: 1,
  },
  label: {
    marginHorizontal: 30,
    marginTop: 20,
    marginBottom: 3,
  },
  buttonBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  submit: {
    marginTop: Platform.OS === "ios" ? 20 : 30,
    marginBottom: 5,
    backgroundColor: "#008c8c",
    paddingVertical: 2,
    borderRadius: 50,
    width: "60%",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  submitText: {
    color: "white",
    fontWeight: "600",
  },
  cancel: {
    marginTop: Platform.OS === "ios" ? 20 : 30,
    marginBottom: 40,
    backgroundColor: "#D35D5D",
    paddingVertical: 2,
    borderRadius: 50,
    width: "60%",
    shadowColor: "#cd2121",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  cancelText: {
    color: "white",
    fontWeight: "600",
  },
  error: {
    color: "red",
    marginHorizontal: 30,
  },
  invisible: {
    color: "red",
    width: "80%",
    marginTop: 10,
    alignSelf: "center",
  },
});
