package com.backend.recipes.repository;

import com.backend.recipes.models.Category;
import com.backend.recipes.models.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    List<Favorite> findByUserId(String id);

}
