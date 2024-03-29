package Full.Stack.RealApp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan({"Full.Stack.RealApp.*"})
public class RealAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(RealAppApplication.class, args);
	}

}
