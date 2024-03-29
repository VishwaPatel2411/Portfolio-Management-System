package Full.Stack.RealApp.myServices;

import java.util.List;

import org.springframework.http.ResponseEntity;

import Full.Stack.RealApp.Entities.ClientsInfo;

public interface ClientService {

	ClientsInfo addClients(ClientsInfo clientsinfo);

	List<ClientsInfo> getDetails();

	ClientsInfo getDetailsById(int id);

	void deleteClient(int id);

	ResponseEntity<ClientsInfo> updateClient(int id, ClientsInfo clientsinfo);

	ResponseEntity<Long> getAUM();

	ResponseEntity<Integer> getTotalClientsNum();

	ResponseEntity<List<ClientsInfo>> SearchClient(String name);


}
