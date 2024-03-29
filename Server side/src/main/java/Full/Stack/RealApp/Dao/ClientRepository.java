package Full.Stack.RealApp.Dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import Full.Stack.RealApp.Entities.ClientsInfo;

@Repository
@EnableJpaRepositories
public interface ClientRepository extends JpaRepository<ClientsInfo, Integer> {

	@Query("Select Sum(c.initialAmount) from clients_details c")
	Long AUM();

	@Query("Select count(*) from clients_details")
	Integer TotalClientsNum();

	List<ClientsInfo> findByNameStartingWith(String name);

}
