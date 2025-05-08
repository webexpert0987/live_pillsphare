import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const deliveryData = [
  {
    deliveryOption: "Standard",
    productType: "Non-refrigerated products or treatments only",
    service: "Royal Mail 48",
    estimatedDelivery: "3-5 working days",
    cost: "Free over £30",
  },
  {
    deliveryOption: "Standard",
    productType: "Non-refrigerated products or treatments only",
    service: "Royal Mail 48",
    estimatedDelivery: "3-5 working days",
    cost: "£2.95",
  },
  {
    deliveryOption: "Express",
    productType: "Non-refrigerated products or treatments only",
    service: "Royal Mail Tracked 24",
    estimatedDelivery: "1 working day (order by 7pm)",
    cost: "£4.95",
  },
  {
    deliveryOption: "Next working day before 1pm",
    productType: "Non-refrigerated products or treatments only",
    service: "Royal Mail Special Delivery",
    estimatedDelivery: "Order before 4pm, Mon-Thu",
    cost: "£8.95",
  },
  {
    deliveryOption: "Saturday delivery before 1pm",
    productType: "Non-refrigerated products or treatments only",
    service: "Royal Mail Special Delivery",
    estimatedDelivery: "Order before 4pm Friday",
    cost: "£9.95",
  },
  {
    deliveryOption: "Next working day before 9am",
    productType: "Non-refrigerated products or treatments only",
    service: "Royal Mail Special Delivery",
    estimatedDelivery: "Order by 4pm, Mon-Thu",
    cost: "£21.95",
  },
  {
    deliveryOption: "Temperature controlled",
    productType: "Refrigerated products",
    service: "Royal Mail 24",
    estimatedDelivery: "1-3 working days",
    cost: "£3.95",
  },
  {
    deliveryOption: "Temperature controlled (orders over £100)",
    productType: "Refrigerated products",
    service: "Royal Mail 24 Signed For",
    estimatedDelivery: "1-3 working days",
    cost: "£3.95",
  },
];

const headCellStyles = {
  fontSize: "18px",
  color: "black",
  fontWeight: "600",
  width: "25%",
  // padding: "18px 25px",
  lineHeight: "1.4",
  "@media (max-width: 991px)": {
    fontSize: "16px",
    padding: "12px 15px",
  },
  "@media (max-width: 767px)": {
    fontSize: "15px",
    padding: "10px 12px",
  },
};
const bodyCellStyles = {
  fontSize: "18px",
  color: "#333333",
  fontWeight: "500",
  width: "25%",
  // padding: "18px 25px",
  lineHeight: "1.4",
  "@media (max-width: 991px)": {
    fontSize: "16px",
    padding: "12px 15px",
  },
  "@media (max-width: 767px)": {
    fontSize: "15px",
    padding: "10px 12px",
  },
};

const DeliveryTable = () => {
  return (
    <TableContainer component={Paper} sx={{ my: 4 }}>
      <Table sx={{ minWidth: 450 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={headCellStyles}>Delivery option</TableCell>
            <TableCell sx={headCellStyles}>Product type</TableCell>
            <TableCell sx={headCellStyles}>Service</TableCell>
            <TableCell sx={headCellStyles}>Estimated delivery times</TableCell>
            <TableCell sx={headCellStyles}>Cost</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {deliveryData.map((row, index) => (
            <TableRow key={index}>
              <TableCell sx={bodyCellStyles}>{row.deliveryOption}</TableCell>
              <TableCell sx={bodyCellStyles}>{row.productType}</TableCell>
              <TableCell sx={bodyCellStyles}>{row.service}</TableCell>
              <TableCell sx={bodyCellStyles}>{row.estimatedDelivery}</TableCell>
              <TableCell sx={bodyCellStyles}>{row.cost}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DeliveryTable;
