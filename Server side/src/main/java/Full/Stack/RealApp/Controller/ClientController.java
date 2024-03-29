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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import Full.Stack.RealApp.Entities.ClientsInfo;
import Full.Stack.RealApp.myServices.ClientService;

@RestController
@CrossOrigin(origins = "http://localhost:4200/")
@RequestMapping("/home")
public class ClientController {

	@Autowired
	private ClientService clientservice;

    //Add Clients
	@PostMapping("/addClient")
	public ClientsInfo addClients(@RequestBody ClientsInfo clientsinfo) {
		return clientservice.addClients(clientsinfo);
	}

	//Get Clients Details
	@GetMapping("/getDetails")
	public List<ClientsInfo> getDetails() {
		return clientservice.getDetails();
	}

	//Get ClientById
	@GetMapping("/getDetails/{id}")
	public ClientsInfo getDetailsById(@PathVariable int id) {
		return clientservice.getDetailsById(id);
	}

	//Delete clientById
	@DeleteMapping("/deleteClient/{id}")
	public ResponseEntity<Void> deleteClient(@PathVariable int id) {
		clientservice.deleteClient(id);
		return ResponseEntity.ok(null);
	}

	//Update Client
	@PutMapping("/updateClient/{id}")
	public ResponseEntity<ClientsInfo> updateClient(@PathVariable int id, @RequestBody ClientsInfo clientsinfo) {
		return clientservice.updateClient(id, clientsinfo);
	}

	//Get AUM- Query based
	@GetMapping("/getAUM")
	public ResponseEntity<Long> getAUM() {
		System.out.print("AUM=");
		return clientservice.getAUM();
	}

	//Get Total Number of clients - Query based
	@GetMapping("/totalClientsNum")
	public ResponseEntity<Integer> getTotalClientsNum() {
		return clientservice.getTotalClientsNum();

	}

	//Search Functionality
	@GetMapping("/search")
	public ResponseEntity<List<ClientsInfo>> SearchClient(@RequestParam String name) {
		return clientservice.SearchClient(name);
	}
	
	


}
