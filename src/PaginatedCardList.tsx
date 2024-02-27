import React, { useState } from "react";
import { Card, CardContent, Typography, Pagination } from "@mui/material";

const data = [
  { id: 1, title: "Card 1", content: "Content for Card 1" },
  { id: 2, title: "Card 2", content: "Content for Card 2" },
  // Add more data as needed
];

const ITEMS_PER_PAGE = 2;

const PaginatedCardList = () => {
  const [page, setPage] = useState(1);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedData = data.slice(startIndex, endIndex);

  return (
    <div>
      {paginatedData.map((item) => (
        <Card key={item.id} style={{ marginBottom: "10px" }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {item.title}
            </Typography>
            <Typography color="text.secondary">{item.content}</Typography>
          </CardContent>
        </Card>
      ))}

      <Pagination
        count={Math.ceil(data.length / ITEMS_PER_PAGE)}
        page={page}
        onChange={handlePageChange}
        style={{ marginTop: "20px" }}
      />
    </div>
  );
};

export default PaginatedCardList;
