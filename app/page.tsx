"use client"

import { useState } from "react"
import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { Heart, Send, Apple, Dumbbell, Coffee, Phone } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function ChatPage() {
  const isMobile = useMobile()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "1",
        role: "assistant",
        content:
          "Hi there! I'm your AI nutrition and fitness coach. I can help you with weight loss, meal planning, workout routines, and more. What would you like assistance with today?",
      },
    ],
  })

  const suggestionCategories = [
    {
      name: "Weight Loss",
      color: "#ff5c9e",
      icon: <Heart className="h-4 w-4" />,
      suggestions: [
        "How can I lose weight healthily?",
        "What's a good calorie deficit for weight loss?",
        "How to avoid weight loss plateaus?",
        "Best foods for weight loss?",
      ],
    },
    {
      name: "Nutrition",
      color: "#0a9cff",
      icon: <Apple className="h-4 w-4" />,
      suggestions: [
        "Suggest a balanced meal plan",
        "How much protein do I need daily?",
        "Best foods for energy throughout the day?",
        "How to reduce sugar cravings?",
      ],
    },
    {
      name: "Fitness",
      color: "#0dce52",
      icon: <Dumbbell className="h-4 w-4" />,
      suggestions: [
        "Quick home workout routines",
        "How often should I exercise?",
        "Best exercises for beginners?",
        "How to build muscle while losing fat?",
      ],
    },
    {
      name: "Lifestyle",
      color: "#f8d98a",
      icon: <Coffee className="h-4 w-4" />,
      suggestions: [
        "How to improve sleep for weight loss?",
        "Healthy snack ideas",
        "Tips for eating out while dieting",
        "How to stay motivated with fitness?",
      ],
    },
  ]

  const handleSuggestionClick = (suggestion: string) => {
    handleInputChange({ target: { value: suggestion } } as any)
    setSelectedCategory(null)
  }

  return (
    <div className="flex flex-col min-h-screen bg-white" style={{ fontFamily: "Lausanne, sans-serif" }}>
      {/* Navbar copied from Curex website */}
      <header className="py-5 border-b bg-white sticky top-0 z-10">
        <div className="container flex items-center justify-between px-4 md:px-6">
          <Link
            href="https://getcurex.com/weightloss"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-90 transition-opacity"
          >
            <div className="text-black font-extrabold text-2xl md:text-3xl tracking-tighter">curex</div>
          </Link>

          <div className="hidden md:flex items-center gap-2 text-gray-600">
            <Phone className="h-4 w-4" />
            <span className="text-sm">(857) 240-1080</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-6">
              <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                Allergy Care
              </Link>
              <Link href="#" className="text-gray-900 border-b-2 border-gray-900 pb-1 text-sm font-medium">
                Weight Loss
              </Link>
            </div>
            <Button
              className="rounded-md px-6 py-2 h-auto text-sm font-medium"
              style={{ backgroundColor: "#ff5c9e", borderColor: "#ff5c9e" }}
            >
              Am I eligible?
            </Button>
          </div>
        </div>
      </header>

      <div className="container px-4 py-8 mx-auto">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-8">
            <div className="p-4 bg-gray-50 border-b border-gray-100">
              <h2 className="font-bold text-lg">Chat with your AI Nutrition Coach</h2>
            </div>

            <div className="p-4 max-h-[500px] overflow-y-auto" style={{ minHeight: "400px" }}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} mb-4`}
                >
                  <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                    <Avatar
                      className={message.role === "user" ? "bg-white border-2" : ""}
                      style={{
                        backgroundColor: message.role === "user" ? "white" : "#ff5c9e",
                        borderColor: message.role === "user" ? "#ff5c9e" : "transparent",
                      }}
                    >
                      {message.role === "user" ? (
                        <span style={{ color: "#ff5c9e" }} className="font-semibold">
                          U
                        </span>
                      ) : (
                        <Heart className="h-5 w-5 text-white" />
                      )}
                    </Avatar>
                    <div
                      className={`rounded-lg p-4 ${
                        message.role === "user" ? "text-white" : "bg-gray-100 text-gray-800"
                      }`}
                      style={{
                        backgroundColor: message.role === "user" ? "#ff5c9e" : "#f5f5f5",
                      }}
                    >
                      {message.content}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start mb-4">
                  <div className="flex gap-3 max-w-[80%]">
                    <Avatar style={{ backgroundColor: "#ff5c9e" }}>
                      <Heart className="h-5 w-5 text-white" />
                    </Avatar>
                    <div className="rounded-lg p-4 bg-gray-100 text-gray-800">
                      <div className="flex space-x-2">
                        <div
                          className="h-2 w-2 rounded-full bg-gray-300 animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="h-2 w-2 rounded-full bg-gray-300 animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        ></div>
                        <div
                          className="h-2 w-2 rounded-full bg-gray-300 animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-gray-100">
              {/* Common Questions near input */}
              {!isLoading && messages.length < 3 && (
                <div className="p-3 bg-gray-50 border-b border-gray-100">
                  {/* Category buttons in a row */}
                  <div className="flex flex-wrap gap-2">
                    {suggestionCategories.map((category) => (
                      <Button
                        key={category.name}
                        variant="outline"
                        className={cn(
                          "text-sm rounded-md px-3 py-1.5 shadow-sm hover:shadow transition-all h-auto",
                          selectedCategory === category.name && "ring-1 ring-[#ff5c9e]",
                        )}
                        style={{
                          borderColor: "#e5e7eb",
                          color: "#333",
                          backgroundColor: selectedCategory === category.name ? `${category.color}10` : "white",
                        }}
                        onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
                      >
                        <div
                          className="w-5 h-5 rounded-full mr-1.5 flex items-center justify-center"
                          style={{ backgroundColor: `${category.color}20` }}
                        >
                          {category.icon}
                        </div>
                        <span className="font-medium">{category.name}</span>
                      </Button>
                    ))}
                  </div>

                  {/* Suggestions in a grid */}
                  {selectedCategory && (
                    <div className="grid grid-cols-2 gap-2 mt-2 animate-in fade-in duration-200">
                      {suggestionCategories
                        .find((c) => c.name === selectedCategory)
                        ?.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            className="text-sm justify-start px-3 py-2 h-auto shadow-sm hover:shadow transition-all rounded-md"
                            style={{
                              borderColor: "#e5e7eb",
                              backgroundColor: "white",
                              color: "#333",
                            }}
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            <span className="text-left line-clamp-1">{suggestion}</span>
                          </Button>
                        ))}
                    </div>
                  )}
                </div>
              )}

              <div className="p-4">
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                  <Input
                    placeholder="Ask about nutrition, diet plans, or fitness..."
                    value={input}
                    onChange={handleInputChange}
                    className="flex-1 border-gray-200 focus-visible:ring-[#ff5c9e]"
                  />
                  <Button
                    type="submit"
                    className="text-white shadow-sm hover:shadow transition-all"
                    style={{ backgroundColor: "#ff5c9e", borderColor: "#ff5c9e" }}
                    disabled={isLoading || !input.trim()}
                  >
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                  </Button>
                </form>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-gray-500 mb-8">
            <p>NutriAI provides general information and is not a substitute for professional medical advice.</p>
          </div>
        </div>
      </div>

      <footer className="mt-auto py-6 bg-gray-50 border-t">
        <div className="container mx-auto px-4">
          <div className="text-center text-xs text-gray-500">
            <p>© 2025 Curex. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

