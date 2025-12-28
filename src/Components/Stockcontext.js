import React, { createContext, useState } from 'react';

export const StockContext = createContext();

export const StockProvider = ({ children }) => {
  const [stocks, setStocks] = useState([]);

  const addStock = (newStock) => {
    setStocks(prevStocks => {
      const existingStock = prevStocks.find(stock => stock.Instrument === newStock.Instrument);

      if (existingStock) {
        // If the stock already exists, aggregate the values
        return prevStocks.map(stock =>
          stock.Instrument === newStock.Instrument
            ? {
                ...stock,
                quantity: Number(stock.quantity) + Number(newStock.quantity),
                Avgvalue: ((Number(stock.quantity) * Number(stock.Avgvalue)) + 
                          (Number(newStock.quantity) * Number(newStock.Avgvalue))) /
                          (Number(stock.quantity) + Number(newStock.quantity))
              }
            : stock
        );
      } else {
        // If the stock doesn't exist, add it to the list
        return [...prevStocks, newStock];
      }
    });
  };

  const updateStock = (instrument, updatedValues) => {
    setStocks((prevStocks) =>
      prevStocks.map((stock) =>
        stock.Instrument === instrument ? { ...stock, ...updatedValues } : stock
      )
    );
  };

  return (
    <StockContext.Provider value={{ stocks, addStock, updateStock }}>
      {children}
    </StockContext.Provider>
  );
};