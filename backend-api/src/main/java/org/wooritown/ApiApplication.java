package org.wooritown;

import org.wooritown.config.AppProperties;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing      // JPA Auditing 활성화
@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class ApiApplication {
    private static final String APPLICATION_LOCATIONS = "spring.config.location="
            + "classpath:application.yml,"
            + "classpath:application-ssl.yml,"
            + "/app/config/community/real-application.yml,"
            + "/app/config/community/application-auth.yml";

    public static void main(String[] args) {
        new SpringApplicationBuilder(ApiApplication.class)
                .properties(APPLICATION_LOCATIONS)
                .run(args);
    }
}