import { useState } from 'react';
import { useAccount } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useArcaneReputeVault } from '@/hooks/useContract';
import { toast } from 'sonner';

const ContractInteraction = () => {
  const { address, isConnected } = useAccount();
  const { useReputationInfo, useAddContribution, useCreateProposal } = useArcaneReputeVault();
  
  // State for contribution form
  const [contributionData, setContributionData] = useState({
    points: '',
    category: '',
    description: '',
  });
  
  // State for proposal form
  const [proposalData, setProposalData] = useState({
    title: '',
    description: '',
    duration: '604800', // 7 days in seconds
    requiredQuorum: '',
  });
  
  // Get user reputation info
  const { data: reputationInfo, isLoading: reputationLoading } = useReputationInfo(address);
  
  // Mutations
  const addContributionMutation = useAddContribution();
  const createProposalMutation = useCreateProposal();
  
  const handleAddContribution = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected || !address) {
      toast.error('Please connect your wallet first');
      return;
    }
    
    try {
      // In a real implementation, you would encrypt the data using FHE
      // For now, we'll use placeholder encrypted data
      const encryptedPoints = '0x' + contributionData.points.padStart(64, '0');
      const encryptedCategory = '0x' + contributionData.category.padStart(64, '0');
      const inputProof = '0x' + '0'.repeat(128); // Placeholder proof
      
      await addContributionMutation.mutateAsync({
        contributor: address,
        points: encryptedPoints,
        category: encryptedCategory,
        description: contributionData.description,
        inputProof,
      });
      
      // Reset form
      setContributionData({ points: '', category: '', description: '' });
    } catch (error) {
      console.error('Error adding contribution:', error);
    }
  };
  
  const handleCreateProposal = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected || !address) {
      toast.error('Please connect your wallet first');
      return;
    }
    
    try {
      // In a real implementation, you would encrypt the data using FHE
      const encryptedQuorum = '0x' + proposalData.requiredQuorum.padStart(64, '0');
      const inputProof = '0x' + '0'.repeat(128); // Placeholder proof
      
      await createProposalMutation.mutateAsync({
        title: proposalData.title,
        description: proposalData.description,
        duration: parseInt(proposalData.duration),
        requiredQuorum: encryptedQuorum,
        inputProof,
      });
      
      // Reset form
      setProposalData({ title: '', description: '', duration: '604800', requiredQuorum: '' });
    } catch (error) {
      console.error('Error creating proposal:', error);
    }
  };
  
  if (!isConnected) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">
            Please connect your wallet to interact with the contract
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* User Reputation Info */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-magical">Your Reputation Status</CardTitle>
          <CardDescription>
            View your current reputation information
          </CardDescription>
        </CardHeader>
        <CardContent>
          {reputationLoading ? (
            <p className="text-muted-foreground">Loading reputation data...</p>
          ) : reputationInfo ? (
            <div className="space-y-2">
              <p><strong>Status:</strong> {reputationInfo.isActive ? 'Active' : 'Inactive'}</p>
              <p><strong>Last Updated:</strong> {new Date(Number(reputationInfo.lastUpdated) * 1000).toLocaleString()}</p>
              <p><strong>Owner:</strong> {reputationInfo.owner}</p>
            </div>
          ) : (
            <p className="text-muted-foreground">No reputation data found. You may need to initialize your reputation first.</p>
          )}
        </CardContent>
      </Card>
      
      {/* Add Contribution Form */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-magical">Add Contribution</CardTitle>
          <CardDescription>
            Submit a new contribution to earn reputation points
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddContribution} className="space-y-4">
            <div>
              <Label htmlFor="points">Points (1-1000)</Label>
              <Input
                id="points"
                type="number"
                min="1"
                max="1000"
                value={contributionData.points}
                onChange={(e) => setContributionData(prev => ({ ...prev, points: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="category">Category (1=Governance, 2=Development, 3=Community)</Label>
              <Input
                id="category"
                type="number"
                min="1"
                max="3"
                value={contributionData.category}
                onChange={(e) => setContributionData(prev => ({ ...prev, category: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={contributionData.description}
                onChange={(e) => setContributionData(prev => ({ ...prev, description: e.target.value }))}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="bg-magical hover:bg-magical/90"
              disabled={addContributionMutation.isPending}
            >
              {addContributionMutation.isPending ? 'Adding Contribution...' : 'Add Contribution'}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {/* Create Proposal Form */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-magical">Create Proposal</CardTitle>
          <CardDescription>
            Create a new governance proposal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateProposal} className="space-y-4">
            <div>
              <Label htmlFor="title">Proposal Title</Label>
              <Input
                id="title"
                value={proposalData.title}
                onChange={(e) => setProposalData(prev => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="proposal-description">Description</Label>
              <Textarea
                id="proposal-description"
                value={proposalData.description}
                onChange={(e) => setProposalData(prev => ({ ...prev, description: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="duration">Duration (seconds)</Label>
              <Input
                id="duration"
                type="number"
                value={proposalData.duration}
                onChange={(e) => setProposalData(prev => ({ ...prev, duration: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="quorum">Required Quorum</Label>
              <Input
                id="quorum"
                type="number"
                value={proposalData.requiredQuorum}
                onChange={(e) => setProposalData(prev => ({ ...prev, requiredQuorum: e.target.value }))}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="bg-magical hover:bg-magical/90"
              disabled={createProposalMutation.isPending}
            >
              {createProposalMutation.isPending ? 'Creating Proposal...' : 'Create Proposal'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContractInteraction;
