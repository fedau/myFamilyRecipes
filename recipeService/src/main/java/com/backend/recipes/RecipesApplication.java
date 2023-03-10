package com.backend.recipes;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.backend.recipes"})
public class RecipesApplication {

	public static void main(String[] args) {
		SpringApplication.run(RecipesApplication.class, args);

	}
}
