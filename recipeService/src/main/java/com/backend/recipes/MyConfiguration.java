package com.backend.recipes;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
        import org.springframework.context.annotation.Configuration;

@Configuration
public class MyConfiguration {
    @Bean
    public Dotenv dotenv() {
        return Dotenv.load();
    }

        @Value("EU_WEST_2")
        private String region;

        @Bean
        public AmazonS3 amazonS3() {
            return AmazonS3ClientBuilder.standard()
                    .withRegion(region)
                    .build();
        }


}
