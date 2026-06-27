"use client";

import { Check, MailPlus, UserCheck, UserMinus, UserX } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { authClient } from "@/lib/auth-client";
import {
  acceptJoinRequest,
  getActiveMembers,
  getPendingJoinRequests,
  rejectJoinRequest,
} from "../actions";

type PendingRequest = {
  id: string;
  userId: string;
  userEmail: string;
  managerEmail: string;
  createdAt: Date;
};

type ActiveMember = {
  id: string;
  name?: string;
  email?: string;
  role: string;
  createdAt: Date;
};

export function TeamSettings({
  organizationSlug,
}: {
  organizationSlug: string;
}) {
  const [pendingRequests, setPendingRequests] = React.useState<
    PendingRequest[]
  >([]);
  const [activeMembers, setActiveMembers] = React.useState<ActiveMember[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [inviteEmail, setInviteEmail] = React.useState("");
  const [inviteRole, setInviteRole] = React.useState<string>("member");

  const loadData = React.useCallback(async () => {
    const [requests, result] = await Promise.all([
      getPendingJoinRequests(organizationSlug),
      getActiveMembers(organizationSlug),
    ]);
    setPendingRequests(requests);
    if (Array.isArray(result)) {
      setActiveMembers(result);
    } else if (result && "members" in result) {
      setActiveMembers(result.members);
    }
    setIsLoading(false);
  }, [organizationSlug]);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSendInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;

    try {
      const { error } = await authClient.organization.inviteMember({
        email: inviteEmail,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        role: inviteRole as any,
      });

      if (error) {
        toast.error("Erro ao enviar convite.");
        return;
      }

      toast.success(`Convite enviado para ${inviteEmail}!`);
      setInviteEmail("");
    } catch {
      toast.error("Erro ao enviar convite.");
    }
  };

  const handleAccept = async (id: string) => {
    const result = await acceptJoinRequest(id, organizationSlug);

    if (result.status === "error") {
      toast.error(result.message);
      return;
    }

    toast.success("Convite enviado ao membro!");
    loadData();
  };

  const handleReject = async (id: string) => {
    const result = await rejectJoinRequest(id);

    if (result.status === "error") {
      toast.error(result.message);
      return;
    }

    toast.success("Solicitação recusada.");
    loadData();
  };

  const handleRemove = async (memberId: string) => {
    if (!confirm("Tem certeza que deseja remover este membro da organização?"))
      return;

    const { error } = await authClient.organization.removeMember({
      memberIdOrEmail: memberId,
    });

    if (error) {
      toast.error("Erro ao remover membro.");
      return;
    }

    toast.success("Membro removido.");
    loadData();
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl w-full mx-auto px-4 py-6">
        <p className="text-sm text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl w-full mx-auto px-4 py-6 space-y-8">
      <Card className="p-0 shadow-sm border-muted/60">
        <CardHeader className="px-6 pt-5 pb-4 border-b border-border">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <MailPlus className="size-4 text-primary" />
            Convidar para a Equipe
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground font-normal">
            Envie um convite direto por e-mail para pré-aprovar um novo
            colaborador na organização.
          </CardDescription>
        </CardHeader>
        <CardContent className="py-5 px-6">
          <form
            onSubmit={handleSendInvite}
            className="flex flex-col sm:flex-row items-end gap-3 w-full"
          >
            <div className="flex-1 w-full space-y-1.5">
              <label
                htmlFor="invite-email"
                className="text-xs font-medium text-foreground"
              >
                E-mail do Colaborador
              </label>
              <Input
                id="invite-email"
                type="email"
                placeholder="colaborador@empresa.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                required
                className="dark:bg-background h-9 text-sm shadow-xs text-muted-foreground font-normal"
              />
            </div>

            <div className="w-full sm:w-48 space-y-1.5">
              <label
                htmlFor="invite-role"
                className="text-xs font-medium text-foreground"
              >
                Função
              </label>
              <Select value={inviteRole} onValueChange={setInviteRole}>
                <SelectTrigger
                  id="invite-role"
                  className="dark:bg-background h-9 text-sm shadow-xs text-muted-foreground font-normal"
                >
                  <SelectValue placeholder="Selecione a função" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member">Membro</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="rounded-lg cursor-pointer h-9 hover:bg-primary/80 w-full sm:w-auto text-sm"
            >
              Enviar Convite
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="p-0 shadow-sm border-muted/60">
        <CardHeader className="px-6 pt-5 pb-4 border-b border-border">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            Aprovações Pendentes
            {pendingRequests.length > 0 && (
              <Badge
                variant="destructive"
                className="rounded-full px-2 py-0.5 text-[10px]"
              >
                {pendingRequests.length}
              </Badge>
            )}
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground font-normal">
            Membros que solicitaram vínculo com esta organização.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {pendingRequests.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground flex flex-col items-center gap-2">
              <UserCheck className="size-8 text-muted-foreground/40" />
              Nenhuma solicitação aguardando aprovação no momento.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="text-xs font-medium px-6 py-3">
                    E-mail
                  </TableHead>
                  <TableHead className="text-xs font-medium px-6 py-3">
                    Gerente solicitado
                  </TableHead>
                  <TableHead className="text-xs font-medium px-6 py-3">
                    Data
                  </TableHead>
                  <TableHead className="text-xs font-medium px-6 py-3 text-right">
                    Ações
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingRequests.map((request) => (
                  <TableRow
                    key={request.id}
                    className="hover:bg-muted/20 border-b border-border"
                  >
                    <TableCell className="px-6 py-4">
                      <span className="text-sm text-foreground">
                        {request.userEmail}
                      </span>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <span className="text-sm text-muted-foreground">
                        {request.managerEmail}
                      </span>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <span className="text-xs text-muted-foreground">
                        {request.createdAt.toLocaleDateString("pt-BR")}
                      </span>
                    </TableCell>
                    <TableCell className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReject(request.id)}
                          className="h-8 rounded-lg text-xs gap-1 cursor-pointer border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
                        >
                          <UserX className="size-3.5" />
                          Recusar
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleAccept(request.id)}
                          className="h-8 rounded-lg text-xs gap-1 cursor-pointer hover:bg-primary/80"
                        >
                          <Check className="size-3.5" />
                          Aceitar
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card className="p-0 shadow-sm border-muted/60">
        <CardHeader className="px-6 pt-5 pb-4 border-b border-border">
          <CardTitle className="text-base font-medium">
            Membros da Equipe
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground font-normal">
            Usuários com acesso ativo à plataforma nesta organização.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {activeMembers.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">
              Nenhum membro ativo.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="text-xs font-medium px-6 py-3">
                    Membro
                  </TableHead>
                  <TableHead className="text-xs font-medium px-6 py-3">
                    Função
                  </TableHead>
                  <TableHead className="text-xs font-medium px-6 py-3 text-right">
                    Ações
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeMembers.map((member) => (
                  <TableRow
                    key={member.name}
                    className="hover:bg-muted/20 border-b border-border"
                  >
                    <TableCell className="px-6 py-4">
                      <span className="text-sm text-foreground">
                        {member.name || member.email || member.id}
                      </span>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <Badge
                        variant="secondary"
                        className="text-xs font-normal"
                      >
                        {member.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-6 py-4 text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRemove(member.id)}
                        className="h-8 rounded-lg text-xs gap-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 cursor-pointer"
                      >
                        <UserMinus className="size-3.5" />
                        Remover
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
