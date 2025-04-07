package Paf.Backend.Paf.Backend.repository;

import Paf.Backend.Paf.Backend.model.UserModel;
import org.hibernate.type.descriptor.converter.spi.JpaAttributeConverter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserModel, Long> {
}
