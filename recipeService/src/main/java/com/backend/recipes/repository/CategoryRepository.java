package com.backend.recipes.repository;

import com.backend.recipes.models.Category;
import com.backend.recipes.models.Instructions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {


    List<Category> findByRecipeId(Long id);

}
