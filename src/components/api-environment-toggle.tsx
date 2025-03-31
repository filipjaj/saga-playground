import { Label } from "@/components/ui/label";
import { useAPIEnvironment } from "@/context/api-environment";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Globe, Server, Settings } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";

export function APIEnvironmentToggle() {
  const { environment, setEnvironment, customUrl, setCustomUrl } = useAPIEnvironment();
  const [showCustomInput, setShowCustomInput] = useState(environment === "custom");
  const [inputValue, setInputValue] = useState(customUrl);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    // Check if URL is valid when it changes
    if (inputValue) {
      try {
        // Check for basic URL validity
        new URL(inputValue);
        setIsValid(true);
      } catch {
        setIsValid(false);
      }
    } else if (environment === "custom") {
      setIsValid(false);
    }
  }, [inputValue, environment]);

  // Update inputValue when customUrl changes
  useEffect(() => {
    setInputValue(customUrl);
  }, [customUrl]);

  const handleEnvironmentChange = (value: string) => {
    setEnvironment(value as "production" | "beta" | "custom");
    setShowCustomInput(value === "custom");
  };

  const handleCustomUrlSave = () => {
    if (isValid) {
      setCustomUrl(inputValue);
    }
  };

  const getEnvironmentIcon = () => {
    switch (environment) {
      case "production":
        return <Server className="h-4 w-4 mr-2" />;
      case "beta":
        return <Settings className="h-4 w-4 mr-2" />;
      case "custom":
        return <Globe className="h-4 w-4 mr-2" />;
      default:
        return null;
    }
  };

  return (
    <TooltipProvider>
      <Card className="shadow-sm">
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getEnvironmentIcon()}
                <Label htmlFor="api-environment" className="font-medium">API Environment</Label>
              </div>
              <Select
                value={environment}
                onValueChange={handleEnvironmentChange}
              >
                <SelectTrigger id="api-environment" className="w-40">
                  <SelectValue placeholder="Select environment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="production" className="flex items-center">
                    <div className="flex items-center">
                      <Server className="h-4 w-4 mr-2" />
                      Production
                    </div>
                  </SelectItem>
                  <SelectItem value="beta" className="flex items-center">
                    <div className="flex items-center">
                      <Settings className="h-4 w-4 mr-2" />
                      Beta
                    </div>
                  </SelectItem>
                  <SelectItem value="custom" className="flex items-center">
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-2" />
                      Custom
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {showCustomInput && (
              <div className="space-y-2">
                <Label 
                  htmlFor="custom-api-url" 
                  className="text-sm text-gray-500"
                >
                  Enter your custom API URL:
                </Label>
                <div className="flex space-x-2">
                  <Input
                    id="custom-api-url"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="https://api.example.com"
                    className={`flex-1 ${!isValid ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                  />
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        onClick={handleCustomUrlSave} 
                        disabled={!isValid || inputValue === customUrl}
                        variant="outline"
                        size="icon"
                      >
                        <CheckCircle className={`h-4 w-4 ${isValid && inputValue !== customUrl ? 'text-green-600' : 'text-gray-400'}`} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {isValid && inputValue !== customUrl 
                        ? 'Save URL' 
                        : !isValid 
                          ? 'Invalid URL' 
                          : 'URL already saved'}
                    </TooltipContent>
                  </Tooltip>
                </div>
                {!isValid && (
                  <p className="text-xs text-red-500 mt-1">
                    Please enter a valid URL (e.g., https://api.example.com)
                  </p>
                )}
                {environment === "custom" && customUrl && isValid && (
                  <div className="text-xs text-green-600 mt-1 flex items-center">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Using custom API at: {customUrl}
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
