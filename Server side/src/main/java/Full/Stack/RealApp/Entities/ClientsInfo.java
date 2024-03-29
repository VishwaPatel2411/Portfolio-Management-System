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
@Entity(name = "clients_details")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "clients_details")

public class ClientsInfo {

	@Id
	@Column
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	@Column
	private String name;

	@Column
	private String accTakenDate;

	@Column
	private long initialAmount;

	@Column
	private long phone;

	@Column
	private String mailId;

	public void setId(int id) {
		this.id = id;
	}

	public void setId(Integer id2) {
		this.id = id2;
	}

	public Integer getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name2) {
		this.name = name2;
	}

	public String getAccTakenDate() {
		return accTakenDate;
	}

	public void setAccTakenDate(String accTakenDate2) {
		this.accTakenDate = accTakenDate2;

	}

	public long getInitialAmount() {
		return initialAmount;
	}

	public void setInitialAmount(long l) {
		this.initialAmount = l;
	}

	public long getPhone() {
		return phone;
	}

	public void setPhone(long phone2) {
		this.phone = phone2;

	}

	public String getMailId() {
		return mailId;
	}

	public void setMailId(String mailId2) {
		this.mailId = mailId2;
	}

}
