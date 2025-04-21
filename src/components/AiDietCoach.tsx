
import React, { useState, useRef, useEffect } from 'react';
import { Bot, Loader2, Send, Mic, MicOff } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { useToast } from '../hooks/use-toast';
import { supabase } from '../integrations/supabase/client';

const AiDietCoach: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<{question: string, answer: string}[]>([]);
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Initialize speech recognition if available
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognitionAPI();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
          
        setPrompt(transcript);
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        toast({
          title: "Voice Recognition Error",
          description: `Error: ${event.error}. Please try again or use text input.`,
          variant: "destructive"
        });
      };
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [toast]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Not Supported",
        description: "Voice recognition is not supported in your browser.",
        variant: "destructive"
      });
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setPrompt('');
      recognitionRef.current.start();
      setIsListening(true);
      toast({
        title: "Voice Activated",
        description: "Speak now to ask about nutrition or diet advice.",
      });
    }
  };

  const generateResponse = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Empty Question",
        description: "Please enter a nutrition or fitness related question",
        variant: "destructive"
      });
      return;
    }

    // Stop listening if active
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    setIsLoading(true);
    try {
      // Call our OpenAI edge function with a nutrition-focused system prompt
      const { data, error } = await supabase.functions.invoke('openai-chat', {
        body: { 
          prompt: `Nutrition question: ${prompt}`,
          context: [
            "You are an AI nutrition coach. Provide scientifically accurate nutrition and diet advice.",
            "Base your answers on current nutritional science and research.",
            "Include specific foods, nutrients, and practical tips in your responses.",
            "Be encouraging and supportive while maintaining accuracy."
          ]
        }
      });
      
      if (error) throw error;
      
      const aiResponse = data.message || "I'm sorry, I couldn't generate a response. Please try again.";
      
      setAnswer(aiResponse);
      setChatHistory(prev => [...prev, {question: prompt, answer: aiResponse}]);
      setPrompt('');
      
      toast({
        title: "Response Generated",
        description: "Your AI nutrition coach has answered!"
      });
    } catch (error: any) {
      console.error("Error generating response:", error);
      toast({
        title: "Error",
        description: "Failed to generate response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="text-recipe-green" />
            AI Nutrition Coach
          </CardTitle>
          <CardDescription>
            Ask questions about nutrition, diet plans, or fitness, and get personalized advice from our AI coach.
            You can type or use voice input.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {chatHistory.length > 0 && (
            <div className="mb-6 space-y-4">
              {chatHistory.map((chat, index) => (
                <div key={index} className="space-y-2">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <p className="font-medium text-gray-700">You asked:</p>
                    <p className="text-gray-800">{chat.question}</p>
                  </div>
                  <div className="bg-recipe-cream p-3 rounded-lg">
                    <p className="font-medium text-gray-700">AI Coach:</p>
                    <p className="text-gray-800">{chat.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="space-y-4">
            <div className="relative">
              <Textarea
                placeholder="How much protein should I eat to build muscle? What foods are best for weight loss?"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className={`min-h-[100px] ${isListening ? 'bg-gray-50 border-recipe-green' : ''}`}
              />
              <Button
                type="button"
                variant={isListening ? "destructive" : "outline"}
                size="icon"
                className="absolute right-2 bottom-2"
                onClick={toggleListening}
                title={isListening ? "Stop listening" : "Start voice input"}
              >
                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              </Button>
            </div>
            <Button 
              onClick={generateResponse} 
              className="w-full bg-recipe-green hover:bg-recipe-darkGreen"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Getting Answer...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Ask Nutrition Coach
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AiDietCoach;
