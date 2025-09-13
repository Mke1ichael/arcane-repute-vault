import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { ARCANE_REPUTE_VAULT_ABI, CONTRACT_CONFIG } from '@/lib/contract-abi';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

// Contract address - will be updated after deployment
const CONTRACT_ADDRESS = CONTRACT_CONFIG.ARCANE_REPUTE_VAULT as `0x${string}`;

export const useArcaneReputeVault = () => {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const queryClient = useQueryClient();

  // Read user reputation info
  const useReputationInfo = (userAddress?: string) => {
    return useReadContract({
      address: CONTRACT_ADDRESS,
      abi: ARCANE_REPUTE_VAULT_ABI,
      functionName: 'getReputationInfo',
      args: userAddress ? [userAddress as `0x${string}`] : undefined,
      query: {
        enabled: !!userAddress,
      },
    });
  };

  // Read contribution info
  const useContributionInfo = (contributionId: number) => {
    return useReadContract({
      address: CONTRACT_ADDRESS,
      abi: ARCANE_REPUTE_VAULT_ABI,
      functionName: 'getContributionInfo',
      args: [BigInt(contributionId)],
    });
  };

  // Read proposal info
  const useProposalInfo = (proposalId: number) => {
    return useReadContract({
      address: CONTRACT_ADDRESS,
      abi: ARCANE_REPUTE_VAULT_ABI,
      functionName: 'getProposalInfo',
      args: [BigInt(proposalId)],
    });
  };

  // Read achievement info
  const useAchievementInfo = (achievementId: number) => {
    return useReadContract({
      address: CONTRACT_ADDRESS,
      abi: ARCANE_REPUTE_VAULT_ABI,
      functionName: 'getAchievementInfo',
      args: [BigInt(achievementId)],
    });
  };

  // Get contract counters
  const useContractCounters = () => {
    const contributionCounter = useReadContract({
      address: CONTRACT_ADDRESS,
      abi: ARCANE_REPUTE_VAULT_ABI,
      functionName: 'contributionCounter',
    });

    const proposalCounter = useReadContract({
      address: CONTRACT_ADDRESS,
      abi: ARCANE_REPUTE_VAULT_ABI,
      functionName: 'proposalCounter',
    });

    const achievementCounter = useReadContract({
      address: CONTRACT_ADDRESS,
      abi: ARCANE_REPUTE_VAULT_ABI,
      functionName: 'achievementCounter',
    });

    return {
      contributionCounter,
      proposalCounter,
      achievementCounter,
    };
  };

  // Add contribution mutation
  const useAddContribution = () => {
    return useMutation({
      mutationFn: async ({
        contributor,
        points,
        category,
        description,
        inputProof,
      }: {
        contributor: string;
        points: string;
        category: string;
        description: string;
        inputProof: string;
      }) => {
        return writeContract({
          address: CONTRACT_ADDRESS,
          abi: ARCANE_REPUTE_VAULT_ABI,
          functionName: 'addContribution',
          args: [
            contributor as `0x${string}`,
            points as `0x${string}`,
            category as `0x${string}`,
            description,
            inputProof as `0x${string}`,
          ],
        });
      },
      onSuccess: () => {
        toast.success('Contribution added successfully!');
        queryClient.invalidateQueries({ queryKey: ['reputation'] });
        queryClient.invalidateQueries({ queryKey: ['contributions'] });
      },
      onError: (error) => {
        toast.error(`Failed to add contribution: ${error.message}`);
      },
    });
  };

  // Create proposal mutation
  const useCreateProposal = () => {
    return useMutation({
      mutationFn: async ({
        title,
        description,
        duration,
        requiredQuorum,
        inputProof,
      }: {
        title: string;
        description: string;
        duration: number;
        requiredQuorum: string;
        inputProof: string;
      }) => {
        return writeContract({
          address: CONTRACT_ADDRESS,
          abi: ARCANE_REPUTE_VAULT_ABI,
          functionName: 'createProposal',
          args: [
            title,
            description,
            BigInt(duration),
            requiredQuorum as `0x${string}`,
            inputProof as `0x${string}`,
          ],
        });
      },
      onSuccess: () => {
        toast.success('Proposal created successfully!');
        queryClient.invalidateQueries({ queryKey: ['proposals'] });
      },
      onError: (error) => {
        toast.error(`Failed to create proposal: ${error.message}`);
      },
    });
  };

  // Cast vote mutation
  const useCastVote = () => {
    return useMutation({
      mutationFn: async ({
        proposalId,
        support,
        votingPower,
        inputProof,
      }: {
        proposalId: number;
        support: boolean;
        votingPower: string;
        inputProof: string;
      }) => {
        return writeContract({
          address: CONTRACT_ADDRESS,
          abi: ARCANE_REPUTE_VAULT_ABI,
          functionName: 'castVote',
          args: [
            BigInt(proposalId),
            support,
            votingPower as `0x${string}`,
            inputProof as `0x${string}`,
          ],
        });
      },
      onSuccess: () => {
        toast.success('Vote cast successfully!');
        queryClient.invalidateQueries({ queryKey: ['proposals'] });
      },
      onError: (error) => {
        toast.error(`Failed to cast vote: ${error.message}`);
      },
    });
  };

  // Execute proposal mutation
  const useExecuteProposal = () => {
    return useMutation({
      mutationFn: async ({ proposalId }: { proposalId: number }) => {
        return writeContract({
          address: CONTRACT_ADDRESS,
          abi: ARCANE_REPUTE_VAULT_ABI,
          functionName: 'executeProposal',
          args: [BigInt(proposalId)],
        });
      },
      onSuccess: () => {
        toast.success('Proposal executed successfully!');
        queryClient.invalidateQueries({ queryKey: ['proposals'] });
      },
      onError: (error) => {
        toast.error(`Failed to execute proposal: ${error.message}`);
      },
    });
  };

  // Verify contribution mutation (verifier only)
  const useVerifyContribution = () => {
    return useMutation({
      mutationFn: async ({
        contributionId,
        isVerified,
      }: {
        contributionId: number;
        isVerified: boolean;
      }) => {
        return writeContract({
          address: CONTRACT_ADDRESS,
          abi: ARCANE_REPUTE_VAULT_ABI,
          functionName: 'verifyContribution',
          args: [BigInt(contributionId), isVerified],
        });
      },
      onSuccess: () => {
        toast.success('Contribution verification updated!');
        queryClient.invalidateQueries({ queryKey: ['contributions'] });
        queryClient.invalidateQueries({ queryKey: ['reputation'] });
      },
      onError: (error) => {
        toast.error(`Failed to verify contribution: ${error.message}`);
      },
    });
  };

  // Unlock achievement mutation (verifier only)
  const useUnlockAchievement = () => {
    return useMutation({
      mutationFn: async ({
        recipient,
        points,
        rarity,
        name,
        description,
        inputProof,
      }: {
        recipient: string;
        points: string;
        rarity: string;
        name: string;
        description: string;
        inputProof: string;
      }) => {
        return writeContract({
          address: CONTRACT_ADDRESS,
          abi: ARCANE_REPUTE_VAULT_ABI,
          functionName: 'unlockAchievement',
          args: [
            recipient as `0x${string}`,
            points as `0x${string}`,
            rarity as `0x${string}`,
            name,
            description,
            inputProof as `0x${string}`,
          ],
        });
      },
      onSuccess: () => {
        toast.success('Achievement unlocked successfully!');
        queryClient.invalidateQueries({ queryKey: ['achievements'] });
        queryClient.invalidateQueries({ queryKey: ['reputation'] });
      },
      onError: (error) => {
        toast.error(`Failed to unlock achievement: ${error.message}`);
      },
    });
  };

  // Verify member mutation (verifier only)
  const useVerifyMember = () => {
    return useMutation({
      mutationFn: async ({
        member,
        isVerified,
      }: {
        member: string;
        isVerified: boolean;
      }) => {
        return writeContract({
          address: CONTRACT_ADDRESS,
          abi: ARCANE_REPUTE_VAULT_ABI,
          functionName: 'verifyMember',
          args: [member as `0x${string}`, isVerified],
        });
      },
      onSuccess: () => {
        toast.success('Member verification updated!');
        queryClient.invalidateQueries({ queryKey: ['members'] });
      },
      onError: (error) => {
        toast.error(`Failed to verify member: ${error.message}`);
      },
    });
  };

  return {
    // Read hooks
    useReputationInfo,
    useContributionInfo,
    useProposalInfo,
    useAchievementInfo,
    useContractCounters,
    
    // Write hooks
    useAddContribution,
    useCreateProposal,
    useCastVote,
    useExecuteProposal,
    useVerifyContribution,
    useUnlockAchievement,
    useVerifyMember,
    
    // Contract info
    contractAddress: CONTRACT_ADDRESS,
    contractConfig: CONTRACT_CONFIG,
  };
};

// Hook for transaction status
export const useTransactionStatus = (hash: `0x${string}` | undefined) => {
  return useWaitForTransactionReceipt({
    hash,
  });
};
