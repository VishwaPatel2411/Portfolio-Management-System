package Full.Stack.RealApp.myServices;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import Full.Stack.RealApp.Dao.ClientRepository;
import Full.Stack.RealApp.Entities.ClientsInfo;

@Service
public class ClientServiceImpl implements ClientService {

	@Autowired
	private ClientRepository clientRepository;

	@Override
	public ClientsInfo addClients(ClientsInfo clientsinfo) {
		return clientRepository.save(clientsinfo);
	}

	@Override

	public List<ClientsInfo> getDetails() {
		return clientRepository.findAll();
	}

	@Override
	public ClientsInfo getDetailsById(int id) {
		return clientRepository.findById(id).orElse(null);
	}

	@Override
	public void deleteClient(int id) {
		clientRepository.deleteById(id);
	}

	@Override
	public ResponseEntity<ClientsInfo> updateClient(int id, ClientsInfo clientsinfo) {
		ClientsInfo c = clientRepository.findById(id).orElseThrow(null);

		if (c != null) {
			c.setName(clientsinfo.getName());
			c.setAccTakenDate(clientsinfo.getAccTakenDate());
			c.setInitialAmount(clientsinfo.getInitialAmount());
			c.setPhone(clientsinfo.getPhone());
			c.setMailId(clientsinfo.getMailId());
			ClientsInfo ci = clientRepository.save(c);
			return ResponseEntity.ok(ci);
		}

		return null;

	}

	@Override
	public ResponseEntity<Long> getAUM() {
		Long sum = clientRepository.AUM();
		return ResponseEntity.ok(sum);
	}

	@Override
	public ResponseEntity<Integer> getTotalClientsNum() {
		Integer TotalClient = clientRepository.TotalClientsNum();
		return ResponseEntity.ok(TotalClient);
	}

	@Override
	public ResponseEntity<List<ClientsInfo>> SearchClient(String name) {
		List<ClientsInfo> l = clientRepository.findByNameStartingWith(name);
		return ResponseEntity.ok(l);
	}

	

}
