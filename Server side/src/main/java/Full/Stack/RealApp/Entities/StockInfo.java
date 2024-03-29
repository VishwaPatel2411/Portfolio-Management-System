package Full.Stack.RealApp.Entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@Entity (name ="stocks_details")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table (name ="stocks_details")

public class StockInfo {
		
	@Id
	@Column
	@GeneratedValue(strategy = GenerationType.AUTO)
    private int stockId;
	
	@Column
	private int clientId;
	
	@Column
	private String stockName;
	
	@Column
	private String buy_sell;
	
	@Column
	private float buyprice;
	
	@Column
	private long buyQuantity;
	
	@Column
	private long sellQuantity;

	@Column
	private String buyDate;
	
	@Column
	private String sellDate;
	
	@Column
	private float totalBuyPrice;
	
	@Column
	private float sellPrice;
	
	@Column
	private float totalSellPrice;
	
	public long getBuyQuantity() {
		return buyQuantity;
	}

	public void setBuyQuantity(long buyQuantity) {
		this.buyQuantity = buyQuantity;
	}

	public long getSellQuantity() {
		return sellQuantity;
	}

	public void setSellQuantity(long sellQuantity) {
		this.sellQuantity = sellQuantity;
	}
	
	public String getBuyDate() {
		return buyDate;
	}

	public void setBuyDate(String buyDate) {
		this.buyDate = buyDate;
	}

	public String getSellDate() {
		return sellDate;
	}

	public void setSellDate(String sellDate) {
		this.sellDate = sellDate;
	}


	public float getBuyprice() {
		return buyprice;
	}

	public void setBuyprice(float buyprice) {
		this.buyprice = buyprice;
	}

	public float getTotalBuyPrice() {
		return totalBuyPrice;
	}

	public void setTotalBuyPrice(float totalBuyPrice) {
		this.totalBuyPrice = totalBuyPrice;
	}

	public float getSellPrice() {
		return sellPrice;
	}

	public void setSellPrice(float sellPrice) {
		this.sellPrice = sellPrice;
	}

	public float getTotalSellPrice() {
		return totalSellPrice;
	}

	public void setTotalSellPrice(float totalSellPrice) {
		this.totalSellPrice = totalSellPrice;
	}


	public int getStockId() {
		return stockId;
	}

	public void setStockId(int id) {
		this.stockId = id;
	}

	public String getStockName() {
		return stockName;
	}
	public void setStockName(String stockName) {
		this.stockName = stockName;
	}
	
	public String getBuy_sell() {
		return buy_sell;
	}
	public void setBuy_sell(String buy_sell) {
		this.buy_sell = buy_sell;
	}



	public int getClientId() {
		return clientId;
	}

	public void setClientId(int clientId) {
		this.clientId = clientId;
	}
	public StockInfo copy() {
        StockInfo copy = new StockInfo();
        copy.setClientId(this.getClientId());
        copy.setBuy_sell(this.getBuy_sell());
        copy.setStockName(this.getStockName());
        copy.setBuyDate(this.getBuyDate());
        copy.setBuyQuantity(this.getBuyQuantity());
        copy.setBuyprice(this.getBuyprice());
        copy.setTotalBuyPrice(this.getTotalBuyPrice());
        return copy;
    }
	
}
