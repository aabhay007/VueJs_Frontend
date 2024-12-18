<template>
    <div class="services-page">
      <Navbar />
      <div class="content fade-in">
        <h1>Our Services</h1>
        <p>
          Welcome to our services page! Here, you can explore the wide range of solutions we provide to meet your needs.
        </p>
        <ul class="services-list">
          <li>Service 1: Description of service 1.</li>
          <li>Service 2: Description of service 2.</li>
          <li>Service 3: Description of service 3.</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import Navbar from '../../components/navbar/Navbar.vue';
  </script>
  
  <style scoped>
  .services-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: Arial, sans-serif;
    padding: 20px;
    color: #ffffff;
  }
  
  .content {
    max-width: 800px;
    text-align: center;
    margin-top: 20px;
  }
  
  .services-list {
    margin: 20px 0;
    padding: 0;
    list-style-type: none;
  }
  
  .services-list li {
    margin: 10px 0;
    font-size: 1.1rem;
  }
  

  </style>
  