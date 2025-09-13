import MemberCard from './MemberCard';
import avatarWizard from '@/assets/avatar-wizard.jpg';
import avatarKnight from '@/assets/avatar-knight.jpg';
import avatarElf from '@/assets/avatar-elf.jpg';
import avatarDragon from '@/assets/avatar-dragon.jpg';

const mockMembers = [
  {
    id: 1,
    name: 'Archmage Solaris',
    avatar: avatarWizard,
    reputation: 9847,
    rank: 'Legendary',
    isEncrypted: true,
  },
  {
    id: 2,
    name: 'Sir Valenheart',
    avatar: avatarKnight,
    reputation: 8523,
    rank: 'Epic',
    isEncrypted: true,
  },
  {
    id: 3,
    name: 'Moonwhisper',
    avatar: avatarElf,
    reputation: 7891,
    rank: 'Epic',
    isEncrypted: true,
  },
  {
    id: 4,
    name: 'Drakorius',
    avatar: avatarDragon,
    reputation: 9234,
    rank: 'Legendary',
    isEncrypted: true,
  },
];

const ReputationDashboard = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Stats Overview */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-4 bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border/50">
          <div>
            <div className="text-2xl font-bold text-magical">{mockMembers.length}</div>
            <div className="text-sm text-muted-foreground">Active Members</div>
          </div>
          <div className="w-px h-12 bg-border" />
          <div>
            <div className="text-2xl font-bold text-magical">100%</div>
            <div className="text-sm text-muted-foreground">FHE Protected</div>
          </div>
          <div className="w-px h-12 bg-border" />
          <div>
            <div className="text-2xl font-bold text-magical">256</div>
            <div className="text-sm text-muted-foreground">Bit Encryption</div>
          </div>
        </div>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockMembers.map((member, index) => (
          <MemberCard
            key={member.id}
            name={member.name}
            avatar={member.avatar}
            reputation={member.reputation}
            rank={member.rank}
            isEncrypted={member.isEncrypted}
            style={{ animationDelay: `${index * 0.2}s` } as any}
          />
        ))}
      </div>

      {/* DAO Info */}
      <div className="mt-12 text-center">
        <div className="bg-card/30 backdrop-blur-sm rounded-lg p-8 border border-border/50 max-w-2xl mx-auto">
          <h2 className="text-2xl font-serif font-semibold mb-4 text-magical">
            Fully Homomorphic Encryption
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Our advanced FHE system ensures that reputation scores remain completely private 
            while still allowing for meaningful computation and governance participation. 
            Members can prove their standing without revealing sensitive numerical data.
          </p>
        </div>
      </div>
    </main>
  );
};

export default ReputationDashboard;