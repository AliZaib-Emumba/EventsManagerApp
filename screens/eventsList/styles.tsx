import styled from "styled-components/native" ;
export const ButtonText = styled.Text({
    fontSize: 16,
    color: "white",
    fontWeight: "500"
});
export const SelectBox = styled.View({
    width: "60%",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
})
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

export const TempView = styled.View({
    marginTop: 20,
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