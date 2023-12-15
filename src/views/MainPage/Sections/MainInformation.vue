<script setup>
// example components
import DefaultInfoCard from "../../../examples/cards/infoCards/DefaultInfoCard.vue";
import CenteredBlogCard from "../../../examples/cards/blogCards/CenteredBlogCard.vue";
</script>
<template>
  <section class="py-7">
    <div class="container">
      <div class="row">
        <div class="col-md-8 text-start mb-5 mt-5">
          <h3 class="z-index-1 position-relative">
            Semantify your business!
          </h3>
          <p class="opacity-8 mb-0">
            Unlocking the Power of Semantic Intelligence
          </p>
        </div>
      </div>
      <div class="row align-items-center">
        <div class="col-lg-6">
          <div class="row justify-content-start">
            <DefaultInfoCard
              color="info"
              icon="assistant"
              title="Custom AI Assistant"
              description="Harness the latest LLM-powered AI assistants, custom-tailored for your company. With access to internal data and systems, our assistants provide personalized support for clients and employees 24/7."
            />
            <DefaultInfoCard
              color="info"
              icon="book"
              title="Semantic Knowledge Base"
              description="Empower your data with meaning and structure. Our AI-driven knowledge base consolidates your company's data, granting instant access to any information you require, right at your fingertips."
            />

          </div>
          <div class="row justify-content-start mt-4">
            <DefaultInfoCard
              color="info"
              icon="insights"
              title="Smart Actions"
              description="Supercharge your AI with Smart Actions. Empower your AI solutions to seamlessly interface with internal systems, serving as the ideal platform for both employees and customers. Elevate efficiency and boost your AI capabilities."
            />
            <DefaultInfoCard
              color="info"
              icon="manage_accounts"
              title="AI Agents"
              description="Experience cutting-edge autonomous automation with AI Agents. They intelligently analyze data, make decisions, and seamlessly interact with systems. Witness the ease and power of automation like never before."
            />
          </div>
        </div>
        <div class="col-lg-4 ms-auto mt-lg-0 mt-6">
          <CenteredBlogCard
            image="https://images.unsplash.com/photo-1544717302-de2939b7ef71?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            title="Unlocking the Power of Semantification"
            description="Semantification is the process of adding meaning to your data and systems. It goes beyond simple data processing; it's about understanding the context, intent, and relationships within your information. It's the key to turning raw data into actionable insights."
          />
        </div>
      </div>
    </div>
  </section>
</template>
