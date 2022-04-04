import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-last-night',
  templateUrl: './last-night.component.html',
  styleUrls: ['./last-night.component.sass']
})
export class LastNightComponent implements OnInit {

  factions = [
    {name: "Lord's alliance", img: 'alliance.webp', active: true, description: "The Lords’ Alliance is a coalition of rulers from cities and towns across all Dukkha, who collectively agree that some solidarity and collaboration is needed to keep monsters and evil organizations at bay. The different rulers, nobles and lords in the Alliance works for the fate and fortune of all, but for his or her own settlement above all others. The alliance counts among its ranks people with vast resources and political influence, also supported by a powerful army, and in general is well-rounded in all aspects. On the other hand, its organization and hierarchy is complex, dealing with different interests and priorities for the different lords."},
    {name: "Emerald Enclave", img: 'emerald.webp', active: false, description: "The Emerald Enclave is a far-ranging group that opposes threats to the natural world and helps others survive the many perils of the wild. Members of the Emerald Enclave know how to survive, and more importantly, they want to help others do the same. They are not opposed to civilization or progress, but they strive to prevent civilization and the wilderness from destroying one another. Within its ranks, the organization boasts powerful archdruids, as well as allies with ancient beings and creatures. On the other hand, they do not have many members, who tend to be distant, isolated and poorly coordinated."},
    {name: "Harpers", img: 'harpers.webp', active: false, description: "The Harpers is an old organization that has risen, been shattered, and risen again several times. Its longevity and resilience are largely due to its decentralized, grassroots, secretive nature, and the near-autonomy of many of its members. The Harpers have 'cells' and lone operatives throughout Dukkha, although they interact and share information with one another from time to time as needs warrant. The Harpers' ideology is noble, and its members pride themselves on their integrity and incorruptibility. Harpers do not seek power or glory, only fair and equal treatment for all. Harpers have powerful allies, as well as the strongest network of informers and hidden knowledge in Dukkha, as well as an impeccable reputation. On the other hand, they do not have any type of military force and an almost non-existent organization between 'cells'."},
    {name: "Order of the Gauntlet", img: 'order.webp', active: false, description: "The order is componed by priests, clerics and holy warriors of good Deities, making common cause against the evils abroad in the world. The Order of the Gauntlet is ready to lash out the moment evil acts, and not a moment before. When evil breaks laws, agreements, or commonly accepted codes of conduct, the Gauntlet strikes hard and fast, without waiting for the blessings of distant temples or the permission of rulers. Evil must be met in the field and smashed, or it will swiftly overcome all. The order has powerful members and the most coordinated and cohesive ranks of any organization, along with a mighty army and a ruthless reputation, fueled by religious zeal and a finely honed sense of justice. On the other hand, the order is not known for its subtlety or stealth, it is bound by complex codes and hierarchies, and its black and white vision sometimes collides with more nuanced interests."},
    {name: "Zhentarim", img: 'zhentarim.webp', active: false, description: "The Zhentarim seeks to become omnipresent and inescapable, more wealthy and powerful, and most importantly, untouchable. The public face of the organization appears much more benign, offering the best mercenaries money can buy, and merchants capable of access to the finests goods. When a merchant needs an escort for his caravan, when a noble needs bodyguards to protect her holdings, or when a city needs trained soldiers to defend its honor, the Zhentarim provides the best-trained fighting men and women money can buy. However, the cost of doing business with the Black Network can be high. The Black Network has almost unlimited resources and military potential, as well as members who are experts in infiltration and trafficking in dark secrets. On the other hand, despite their facade, they have a dark reputation and few in Dukkha are openly willing to do business with or trust them."},
  ]
  selectedFaction = this.factions[0];
  focus = '';
  strategy = '';
  factionLead = '';

  constructor() { }

  ngOnInit(): void {
  }

  selectFaction(faction: {name:string, img: string, active: boolean, description: string}) {
    this.selectedFaction.active = false;
    faction.active = true;
    this.selectedFaction = faction;
  }

}
