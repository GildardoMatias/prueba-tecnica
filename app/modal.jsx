import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function MenuModal({ isModalVisible, setIsModalVisible }) {
  return (


    <Modal style={_styles.centeredView} visible={isModalVisible} animationType="slide" transparent onDismiss={() => setIsModalVisible(false)}>
      <View style={_styles.centeredView}>
        <View style={_styles.modalView}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>Opciones</Text>
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <Text>x</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity>
            <Text>Editar vvvv⚠️ Warning Emoji | Meaning, Copy And Paste🚨⚠️📢❗ | Copy & Paste </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text> vvvvt is ❌ Borrar ✅ Botón De Marca De Verificación Emoji: Significado y Uso
 ✔️ Check Mark Emoji | Meaning, Copy And Paste
</Text>
          </TouchableOpacity>


        </View>
      </View>

    </Modal>


  );
}

const _styles = StyleSheet.create({
  centeredView: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: 'yellow'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 35,
    paddingVertical: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignContent: 'center'
  },
})
