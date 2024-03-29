package Full.Stack.RealApp.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Full.Stack.RealApp.Entities.StockInfo;
import Full.Stack.RealApp.myServices.StockService;



@RestController
@CrossOrigin(origins = "http://localhost:4200/")
@RequestMapping("/home")
public class StockController {

	@Autowired
	private StockService stockService;
	
	
    //AddStocks inside client
    @PostMapping("/clients/{id}/getStocks/addStocks")
    public StockInfo addStockForClient(@PathVariable int id, @RequestBody StockInfo stockInfo) {
    	return stockService.addStockForClient(id, stockInfo);
    }
    
    //GetStocksForEachClient //query based
    @GetMapping("/clients/{clientId}/getStocks")
	public List<StockInfo> getHoldStocksByClientId(@PathVariable int clientId) {
		return stockService.getHoldStocksByClientId(clientId);
	}
    
    //Get Sold Stocks
    @GetMapping("clients/{clientId}/getSoldStocks")
    public List<StockInfo> getSoldStocksByClientId(@PathVariable int clientId){
    	return stockService.getSoldStocksByClientId(clientId);
    }
    
    //Get stockByStockId
    @GetMapping ("/getStockById/{stockId}")
    public StockInfo getStockByStockId(@PathVariable int stockId){
    	return stockService.getStockByStockId(stockId);
    	
    }
    
    //Delete stockByStockId
    @DeleteMapping("/getStocks/{stockId}/deleteStock")
        public String deleteStock(@PathVariable int stockId) {
    	return stockService.deleteStock(stockId);
    }
    
    //Update Stock Details
    @PutMapping("{clientId}/updateStock/{stockId}")
    	public ResponseEntity<StockInfo> updateStock (@PathVariable int clientId ,@PathVariable int stockId, @RequestBody StockInfo stockInfo)
    {
		return stockService.updateStock(clientId,stockId, stockInfo);  	
    }
   
    //push stock from buy to sold section
    @PostMapping("{clientId}/{stockId}/sellStock")
    public ResponseEntity<StockInfo> addToSold(@PathVariable int stockId,@PathVariable int clientId,@RequestBody StockInfo stockInfo) {
		return stockService.addToSold(stockId,clientId,stockInfo);
    	
    }
    
    //update sold stock
    @PutMapping("{clientId}/{stockId}/updateSoldStock")
    public ResponseEntity<StockInfo> updateSoldSold(@PathVariable int clientId,@PathVariable int stockId, @RequestBody StockInfo stockInfo){
    	return stockService.updateSoldStock(clientId,stockId,stockInfo);
    }
    
    //merge rows into sold section based on condition
    @PutMapping("/MergeSellColumns")
    public void mergeSellColumns() {
    	System.out.println("controller");
    	 stockService.mergeSellColumns();
    }
    
  //merge rows into buy section based on condition
    @PutMapping("/mergeBuyColumns")
     public void mergeBuyColumns() {
    	stockService.mergeBuyColumns();
    }    
    
    @PutMapping("/undoMerge")
    public void undoMerge() {
        stockService.undoMerge();
    }
    
    @PutMapping("/undoSoldMerge")
    public void undoSoldMerge() {
        stockService.undoSoldMerge();
    }
	    
    
    //Calculate stock profit
    @GetMapping("clients/{clientId}/stockProfit")
    public ResponseEntity<Long> stockProfit(@PathVariable int clientId){
    	return stockService.stockProfit(clientId);
    }
    
    @GetMapping("/clientProfit")
    public ResponseEntity<Long> clientProfit(){
    	return stockService.clientProfit();
    }
    
    }

