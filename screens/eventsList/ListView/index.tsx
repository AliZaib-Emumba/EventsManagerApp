import React , {useState} from "react" ;
import { Picker } from "@react-native-picker/picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import {ButtonText , Container , SelectBox , RowView , Button , CardContainer , Header , Heading , TempView , ActionButtons , CardDateText , CardDescription , Label} from "../styles" ;
const ListView = ({navigation}:{navigation:any}) => {
    const [filterItem, setFilterItem] = useState("all");
    return (
        <Container>
            <RowView>
                <SelectBox>
                    <Picker
                        selectedValue={filterItem}
                        onValueChange={(item) => setFilterItem(item)}
                    >
                        <Picker.Item label="All" value="all" />
                        <Picker.Item label="Events" value="event" />
                        <Picker.Item label="Out of Office" value="outOfOffice" />
                        <Picker.Item label="Tasks" value="task" />
                    </Picker>
                </SelectBox>
                <Button onPress={() => navigation.navigate("CreateEvent")} ><ButtonText>+ Create Event</ButtonText></Button>
            </RowView>
            {/* FlatList later */}
            <TempView>
                <CardContainer>
                    <Header>
                        <Heading>Card Title</Heading>
                        <ActionButtons>
                            <TouchableOpacity activeOpacity={0.7}><Ionicons name="trash-outline" size={20} color="#735F8C" /></TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.7}><Ionicons name="pencil-sharp" size={20} color="#735F8C" /></TouchableOpacity>
                        </ActionButtons>
                    </Header>
                    <CardDateText>6-12-2021</CardDateText>
                    <CardDescription>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Leo vel orci porta non.</CardDescription>
                    <Label>Files:</Label>
                </CardContainer>
            </TempView>
        </Container>
    )
}

export default ListView ;