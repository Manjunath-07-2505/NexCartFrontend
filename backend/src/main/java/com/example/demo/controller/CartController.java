package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.service.CartService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    // Get total cart item count
    @GetMapping("/items/count")
    public ResponseEntity<Integer> getCartItemCount(HttpServletRequest request) {

        User user = (User) request.getAttribute("authenticatedUser");

        int count = cartService.getCartItemCount(user.getUserId());

        return ResponseEntity.ok(count);
    }


    // Fetch all cart items
    @GetMapping("/items")
    public ResponseEntity<Map<String, Object>> getCartItems(HttpServletRequest request) {

        User user = (User) request.getAttribute("authenticatedUser");

        Map<String, Object> cartItems = cartService.getCartItems(user.getUserId());

        return ResponseEntity.ok(cartItems);
    }


    // Add item to cart
    @PostMapping("/add")
    public ResponseEntity<Void> addToCart(
            HttpServletRequest request,
            @RequestBody Map<String, Object> body) {

        User user = (User) request.getAttribute("authenticatedUser");

        int productId = (int) body.get("productId");

        int quantity = body.containsKey("quantity")
                ? (int) body.get("quantity")
                : 1;

        cartService.addToCart(user.getUserId(), productId, quantity);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }


    // Update quantity
    @PutMapping("/update")
    public ResponseEntity<Void> updateCartItemQuantity(
            HttpServletRequest request,
            @RequestBody Map<String, Object> body) {

        User user = (User) request.getAttribute("authenticatedUser");

        int productId = (int) body.get("productId");
        int quantity = (int) body.get("quantity");

        cartService.updateCartItemQuantity(user.getUserId(), productId, quantity);

        return ResponseEntity.ok().build();
    }


    // Delete cart item
    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteCartItem(
            HttpServletRequest request,
            @RequestBody Map<String, Object> body) {

        User user = (User) request.getAttribute("authenticatedUser");

        int productId = (int) body.get("productId");

        cartService.deleteCartItem(user.getUserId(), productId);

        return ResponseEntity.noContent().build();
    }
}