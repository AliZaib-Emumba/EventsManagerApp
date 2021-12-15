import styled from "styled-components/native" ;

export const ButtonText = styled.Text({
    fontSize: 16,
    color: "white",
    fontWeight: "500"
});
type SELECTBOXTYPE = {
    platform :string
}
export const SelectBox = styled.View<SELECTBOXTYPE>(props => ({
    height: props.platform === "ios" ? 35 : 40,
    justifyContent: "center" , 
    alignItems: "center" ,
    textAlign: "center" ,
    paddingLeft: props.platform === "ios" ? 20 : 0 ,
    width: "60%",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
}))
export const Container = styled.View({
    paddingVertical: 20,
    paddingHorizontal: 10
})
export const RowView = styled.View({
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
})
export const Button = styled.TouchableOpacity({
    backgroundColor: "#735F8C",
    borderRadius: 8,
    padding: 8,
});

export const CardContainer = styled.View({
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    elevation: '5',
    backgroundColor: "white",
})
export const Header = styled.View({
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
})

export const Heading = styled.Text({
    color: "#735F8C",
    fontWeight: "bold",
    fontSize: 20
});
export const HeadingTextField= styled.TextInput({
    color: "#735F8C",
    fontWeight: "bold",
    fontSize: 20
});

export const TempView = styled.View({
    marginTop: 20,
    padding: 10
});

export const ActionButtons = styled.View({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "25%"
})

export const CardDateText = styled.Text({
    marginTop: 4,
    color: "gray",
    fontSize: 13,
    fontWeight: 400
})

export const CardDescription = styled(CardDateText)({
    fontSize: 14
});

export const Label = styled.Text({
    marginTop: 8,
    fontSize: 11,
    color: "gray",
})

export const CalendarContainer = styled.View({
    marginVertical: 10,
})
export const FlatListContainer = styled.View({
    paddingVertical: 10,
    marginBottom: 15
})

export const CancelButton = styled.TouchableOpacity({
    padding: 4 ,
    borderRadius: 8 ,
    backgroundColor: "#F25555",
    marginLeft: 20
});

export const UpdateButton = styled.TouchableOpacity({
    padding: 4,
    borderRadius: 8 , 
    backgroundColor: "#735F8C",
    
})

export const UpdateButtonsText = styled.Text({
    fontSize: 16,
    fontWeight: 600 ,
    color: "white",
})

export const UpdateButtonsView = styled.View({
    marginTop: 20,
    flexDirection: "row" , 
    alignItems: "center"
})

export const NoEventsContainer = styled.View({
    alignItems: "center" , 
    justifyContent: "center" , 
    marginTop: 25,
})